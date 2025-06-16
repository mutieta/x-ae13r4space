<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\ArticlesResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\ViewAction;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components as Components;

class ArticlesResource extends Resource
{
    protected static ?string $model = Article::class;
    protected static ?string $navigationGroup = 'Articles';
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(2)->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(255)
                        ->reactive()
                        ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) =>
                            $operation === 'create'
                                ? $set('slug', Str::slug($state))
                                : null
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true),
                ]),

                RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),

                Grid::make(2)->schema([
                    Select::make('author_id')
                        ->label('Author')
                        ->relationship('author', 'name')
                        ->searchable()
                        ->preload()
                        ->required(),

                    Select::make('category_id')
                        ->label('Category')
                        ->relationship('category', 'name')
                        ->searchable()
                        ->preload()
                        ->required(),
                ]),

                Grid::make(2)->schema([
                    DatePicker::make('published_at')
                        ->label('Published Date')
                        ->format('d/m/Y')
                        ->nullable(),

                    Select::make('tags')
                        ->label('Tags')
                        ->relationship('tags', 'name')
                        ->multiple()
                        ->searchable()
                        ->preload()
                        ->placeholder('Select tags'),
                ]),

                FileUpload::make('thumbnail')
                    ->label('Thumbnail')
                    ->image()
                    ->disk('cloudinary')
                    ->visibility('public')
                    ->directory('articles/thumbnails')
                    ->nullable()
                    ->maxSize(4096)
                    ->columnSpanFull(),

                Select::make('status')
                    ->options([
                        'published' => 'Published',
                        'draft'     => 'Draft',
                        'archived'  => 'Archived',
                    ])
                    ->default('published')
                    ->required()
                    ->columnSpanFull()
                    ->helperText('Set the publication status of the article.'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')
                    ->disk('cloudinary')
                    ->label('Image'),

                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('author.name')
                    ->label('Author')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'published' => 'success',
                        'draft'     => 'warning',
                        'archived'  => 'danger',
                    ])
                    ->sortable(),

                TextColumn::make('published_at')
                    ->label('Published Date')
                    ->date('M j, Y')
                    ->sortable(),

                TextColumn::make('tags.name')
                    ->label('Tags')
                    ->listWithLineBreaks()
                    ->limitList(2)
                    ->expandableLimitedList()
                    ->searchable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\Filter::make('global_search')
                    ->form([
                        Forms\Components\TextInput::make('query')
                            ->placeholder('Search articles...')
                            ->debounce(500),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        if ($data['query'] ?? null) {
                            $query->where('title', 'like', '%' . $data['query'] . '%')
                                ->orWhere('status', 'like', '%' . $data['query'] . '%')
                                ->orWhereHas('author', fn (Builder $authorQuery) =>
                                    $authorQuery->where('name', 'like', '%' . $data['query'] . '%'));
                        }
                        return $query;
                    }),

                SelectFilter::make('status')
                    ->options([
                        'published' => 'Published',
                        'draft'     => 'Draft',
                        'archived'  => 'Archived',
                    ])
                    ->multiple()
                    ->label('Status'),
            ])
            ->actions([
                EditAction::make(),
                ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('published_at', 'desc');
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Components\Section::make()
                    ->schema([
                        Components\Split::make([
                            Components\Grid::make(2)->schema([
                                Components\Group::make([
                                    Components\TextEntry::make('title'),
                                    Components\TextEntry::make('slug'),
                                    Components\TextEntry::make('published_at')
                                        ->badge()
                                        ->date()
                                        ->color('success'),
                                ]),
                                Components\Group::make([
                                    Components\TextEntry::make('author.name'),
                                    Components\TextEntry::make('category.name'),
                                    Components\TextEntry::make('tags.name'),
                                ]),
                            ]),
                            Components\ImageEntry::make('thumbnail')
                                ->hiddenLabel()
                                ->grow(false),
                        ])->from('lg'),
                    ]),
                Components\Section::make('Content')
                    ->schema([
                        Components\TextEntry::make('content')
                            ->prose()
                            ->markdown()
                            ->hiddenLabel(),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'edit'   => Pages\EditArticle::route('/{record}/edit'),
            'view'   => Pages\ViewArticle::route('/{record}'),
        ];
    }
}

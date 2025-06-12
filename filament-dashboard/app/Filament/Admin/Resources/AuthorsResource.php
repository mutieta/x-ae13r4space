<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\AuthorsResource\Pages;
use App\Filament\Admin\Resources\AuthorsResource\RelationManagers;
use App\Models\Author;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary; 

class AuthorsResource extends Resource
{
    protected static ?string $model = Author::class;
    protected static ?string $navigationGroup = 'Articles';

    protected static ?string $navigationIcon = 'heroicon-o-pencil';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->label('Author Name'),
                Forms\Components\TextInput::make('email')
                    ->email()
                    ->maxLength(255)
                    ->label('Email'),
                Forms\Components\Textarea::make('bio')
                    ->maxLength(500)
                    ->label('Biography'),
                Forms\Components\FileUpload::make('profile_picture')
                    ->required()
                    ->image()
                    ->maxSize(1024)
                    ->disk('public')
                    ->directory('authors')
                    ->label('Profile Picture'),
                Forms\Components\DateTimePicker::make('published_at')
                    ->label('Published At')
                    ->format('Y-m-d H:i:s') // This ensures proper format
                    ->displayFormat('d/m/Y H:i') // This is what user sees
                    ->default(now())
                    ->nullable(),
            ]
            )->columns([
                'sm' => 1,
                'md' => 2,
                
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->label('Author Name'),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->label('Email'),
                Tables\Columns\TextColumn::make('bio')
                    ->limit(50)
                    ->label('Biography'),
                Tables\Columns\ImageColumn::make('profile_picture')
                    ->disk('public') 
                    ->label('Profile Picture'),
                
                
            ])
            ->filters([
                
            ])
            
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAuthors::route('/'),
            'create' => Pages\CreateAuthors::route('/create'),
            'edit' => Pages\EditAuthors::route('/{record}/edit'),
        ];
    }
}

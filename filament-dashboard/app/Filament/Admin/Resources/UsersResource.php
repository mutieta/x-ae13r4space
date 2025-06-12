<?php

namespace App\Filament\Admin\Resources;

use App\Models\User;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms;
use App\Filament\Admin\Resources\UsersResource\Pages;


class UsersResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

  

    protected static ?string $navigationGroup = 'Users';

    protected static ?int $navigationSort = 3;

    

    public static function form(Form $form): Form
    {
    return $form
        ->schema([
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('email')->email()->required(),
            Forms\Components\TextInput::make('password')
                ->password()
                ->minLength(8)
                ->required(fn ($get) => $get('id') === null) // Only required on create
                ->dehydrateStateUsing(fn ($state) => bcrypt($state)) // Hash the password
                ->label('Password'),
            Forms\Components\Select::make('role')
                ->options([
                    'admin' => 'Admin',
                    'viewer' => 'Viewer',
                ])
                ->default('viewer')
                ->required()
                ->label('User Role'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->searchable()
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Registered')
                    ->dateTime()
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make(), // ✅ View action
                Tables\Actions\EditAction::make(), // ✅ Edit action
                Tables\Actions\DeleteAction::make(), // ✅ Delete action
            ])
            ->bulkActions([]); // No bulk actions
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUsers::route('/create'),
            'edit' => Pages\EditUsers::route('/{record}/edit'),
        ];
    }
}


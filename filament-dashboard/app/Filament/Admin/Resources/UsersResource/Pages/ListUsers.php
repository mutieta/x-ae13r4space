<?php

namespace App\Filament\Admin\Resources\UsersResource\Pages;

use App\Filament\Admin\Resources\UsersResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use Illuminate\Database\Eloquent\Builder;

class ListUsers extends ListRecords
{
    protected static string $resource = UsersResource::class;

        protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    
public function getTabs(): array
{
    return [
        'Admin' => Tab::make()
            ->query(fn (Builder $query) => $query->where('role', 'admin'))
            ->icon('heroicon-o-shield-check')
            ,
        'User' => Tab::make()
            ->query(fn (Builder $query) => $query->where('role', 'viewer'))
            ->icon('heroicon-o-user')
           ,
    ];
}


}

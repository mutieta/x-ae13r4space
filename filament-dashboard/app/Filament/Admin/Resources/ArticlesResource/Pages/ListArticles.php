<?php

namespace App\Filament\Admin\Resources\ArticlesResource\Pages;


use App\Filament\Admin\Resources\ArticlesResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListArticles extends ListRecords
{
    protected static string $resource = ArticlesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

<?php

namespace App\Filament\Admin\Resources\AuthorsResource\Pages;

use App\Filament\Admin\Resources\AuthorsResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAuthors extends ListRecords
{
    protected static string $resource = AuthorsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

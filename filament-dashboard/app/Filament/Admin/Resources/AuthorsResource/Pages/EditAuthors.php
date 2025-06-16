<?php

namespace App\Filament\Admin\Resources\AuthorsResource\Pages;

use App\Filament\Admin\Resources\AuthorsResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAuthors extends EditRecord
{
    protected static string $resource = AuthorsResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

     protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('index');
}
}

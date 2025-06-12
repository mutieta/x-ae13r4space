<?php

namespace App\Filament\Admin\Resources\ArticlesResource\Pages;

use App\Filament\Admin\Resources\ArticlesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

// Ensure the ArticlesResource class exists at the specified namespace.
// If it is in a different namespace or file, update the import accordingly.

class EditArticle extends EditRecord
{
    protected static string $resource = ArticlesResource::class;

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

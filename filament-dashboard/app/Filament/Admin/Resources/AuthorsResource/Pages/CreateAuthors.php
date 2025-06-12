<?php

namespace App\Filament\Admin\Resources\AuthorsResource\Pages;

use App\Filament\Admin\Resources\AuthorsResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateAuthors extends CreateRecord
{
    protected static string $resource = AuthorsResource::class;
     protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('index');
}
}

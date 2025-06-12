<?php

namespace App\Filament\Admin\Resources\ArticlesResource\Pages;

use App\Filament\Admin\Resources\ArticlesResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateArticle extends CreateRecord
{
    protected static string $resource = ArticlesResource::class;

    protected function getRedirectUrl(): string
{
    return $this->getResource()::getUrl('index');
}
}

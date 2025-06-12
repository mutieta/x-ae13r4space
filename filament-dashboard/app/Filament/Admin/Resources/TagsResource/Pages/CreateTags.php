<?php

namespace App\Filament\Admin\Resources\TagsResource\Pages;

use App\Filament\Admin\Resources\TagsResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateTags extends CreateRecord
{
    protected static string $resource = TagsResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

}

<?php

namespace App\Filament\Admin\Resources\ArticlesResource\Pages;

use App\Filament\Admin\Resources\ArticlesResource;
use App\Models\Article;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Contracts\Support\Htmlable;

class ViewArticle extends ViewRecord
{
    protected static string $resource = ArticlesResource::class;

    public function getTitle(): string | Htmlable
    {
        /** @var Post */
        $record = $this->getRecord();

        return $record->title;
    }

    protected function getActions(): array
    {
        return [];
    }
}
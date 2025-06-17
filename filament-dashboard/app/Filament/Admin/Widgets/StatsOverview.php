<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Card::make('Views', '8')
                ->description('+5% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Card::make('New Articles', '1')
                ->description('-12% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Card::make('Active Users', '1')
                ->description('-80% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Card::make('New Users', '3')
                ->description('+25% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
        ];
    }
}

<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class StatsOverview extends BaseWidget
{
    protected function getCards(): array
    {
        return [
            Card::make('Views', '1.2K')
                ->description('+5% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Card::make('New Articles', '4')
                ->description('-12% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Card::make('Active Users', '420')
                ->description('-8% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Card::make('New Users', '78')
                ->description('+25% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
        ];
    }
}

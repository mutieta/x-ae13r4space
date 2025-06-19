<?php

namespace App\Filament\Admin\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
      
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Views', '8')
                ->description('+5% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),

            Stat::make('New Articles', '1')
                ->description('-12% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Stat::make('Active Users', '1')
                ->description('-80% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),

            Stat::make('New Users', '3')
                ->description('+25% than yesterday')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success'),
        ];
    }
}
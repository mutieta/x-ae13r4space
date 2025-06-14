<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class ActivityChart extends ChartWidget
{
    protected static ?string $heading = 'Activity';
    protected static ?string $maxWidth = 'full';
    protected int | string | array $columnSpan = 'full';
    
    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Views (K)',
                    'data' => [24, 28, 31, 33, 26, 29], // Replace with real data
                    'backgroundColor' => '#f59e0b', // amber-500
                ],
                [
                    'label' => 'Articles Published',
                    'data' => [48, 52, 60, 50, 61, 69], 
                    'backgroundColor' => '#6b21a8', // purple-800
                ],
            ],
            'labels' => ['Oct \'23', 'Nov \'23', 'Dec \'23', 'Jan \'24', 'Feb \'24', 'Mar \'24'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}

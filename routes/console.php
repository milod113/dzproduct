<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('cart:send-abandoned-emails --hours=2')
    ->name('abandoned-cart-emails')
    ->description('Send abandoned cart reminder emails')
    ->everyThirtyMinutes();

<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Payment Gateway
    |--------------------------------------------------------------------------
    |
    | Supported: 'simulated', 'monetbil', 'paygate'
    |
    */
    'default' => env('PAYMENT_GATEWAY', 'simulated'),

    /*
    |--------------------------------------------------------------------------
    | Payment Gateways Configuration
    |--------------------------------------------------------------------------
    */
    'gateways' => [

        'simulated' => [
            'driver' => 'simulated',
            'test_mode' => true,
        ],

        'monetbil' => [
            'driver' => 'monetbil',
            'api_key' => env('MONETBIL_API_KEY'),
            'service_key' => env('MONETBIL_SERVICE_KEY'),
            'test_mode' => env('MONETBIL_TEST_MODE', true),
        ],

        'paygate' => [
            'driver' => 'paygate',
            'merchant_id' => env('PAYGATE_MERCHANT_ID'),
            'api_key' => env('PAYGATE_API_KEY'),
            'test_mode' => env('PAYGATE_TEST_MODE', true),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    */
    'currency' => 'DZD',
    'locale' => 'fr_DZ',

    /*
    |--------------------------------------------------------------------------
    | Callback URLs
    |--------------------------------------------------------------------------
    */
    'callback_url' => env('APP_URL') . '/api/payment/callback',
    'return_url' => env('APP_URL') . '/payment/return',
    'cancel_url' => env('APP_URL') . '/payment/cancel',
];

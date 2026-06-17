<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Commission Rate (%)
    |--------------------------------------------------------------------------
    | Percentage of each sale that goes to the affiliate.
    */
    'commission_rate' => env('REFERRAL_COMMISSION_RATE', 10),

    /*
    |--------------------------------------------------------------------------
    | Cookie Lifetime (days)
    |--------------------------------------------------------------------------
    | How long the referral cookie lasts after the first click.
    */
    'cookie_lifetime' => 30,

    /*
    |--------------------------------------------------------------------------
    | Minimum Payout Amount (DZD)
    |--------------------------------------------------------------------------
    | Minimum balance before an affiliate can request a payout.
    */
    'min_payout' => env('REFERRAL_MIN_PAYOUT', 1000),
];

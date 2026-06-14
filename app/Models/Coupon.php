<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    protected $fillable = [
        'code',
        'discount_percent',
        'is_active',
        'usage_limit',
        'used_count',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'discount_percent' => 'decimal:2',
            'expires_at' => 'datetime',
        ];
    }
}

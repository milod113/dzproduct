<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellerPlanRequest extends Model
{
    use HasFactory;

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_EXPIRED = 'expired';

    public const PAYMENT_PENDING = 'pending_payment';
    public const PAYMENT_PAID = 'paid';
    public const PAYMENT_APPROVED = 'approved';
    public const PAYMENT_EXPIRED = 'expired';

    protected $fillable = [
        'seller_id',
        'reviewed_by',
        'current_plan',
        'requested_plan',
        'plan_price',
        'currency',
        'payment_method',
        'payment_reference',
        'payment_proof',
        'paid_at',
        'seller_note',
        'status',
        'payment_status',
        'admin_note',
        'reviewed_at',
        'expires_at',
    ];

    protected function casts(): array
    {
        return [
            'reviewed_at' => 'datetime',
            'paid_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}

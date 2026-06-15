<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceMission extends Model
{
    public const STATUS_RESERVED = 'reserved';
    public const STATUS_BRIEF_SUBMITTED = 'brief_submitted';
    public const STATUS_IN_REVIEW = 'in_review';
    public const STATUS_IN_PROGRESS = 'in_progress';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_REVISION_REQUESTED = 'revision_requested';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        'order_id',
        'product_id',
        'client_id',
        'seller_id',
        'mission_number',
        'status',
        'brief_title',
        'brief_objective',
        'brief_requirements',
        'brief_deadline',
        'brief_reference_link',
        'brief_notes',
        'seller_delivery_message',
        'brief_submitted_at',
        'started_at',
        'delivered_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'brief_submitted_at' => 'datetime',
            'started_at' => 'datetime',
            'delivered_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function messages()
    {
        return $this->hasMany(ServiceMissionMessage::class)->latest();
    }
}

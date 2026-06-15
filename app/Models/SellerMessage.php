<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SellerMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'sender_id',
        'product_id',
        'sender_name',
        'sender_email',
        'sender_phone',
        'subject',
        'message',
        'seller_reply',
        'seller_replied_at',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
            'seller_replied_at' => 'datetime',
        ];
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

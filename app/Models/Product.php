<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'seller_id',
        'name',
        'slug',
        'description',
        'price',
        'old_price',
        'file_path',
        'file_type',
        'pages',
        'is_active',
        'sales_count',
        'rating_avg',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:2',
            'old_price' => 'decimal:2',
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}

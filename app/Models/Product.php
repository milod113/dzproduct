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
        'product_type',
        'is_free',
        'description',
        'price',
        'old_price',
        'file_path',
        'file_type',
        'pages',
        'file_size_label',
        'item_count',
        'skill_level',
        'usage_license',
        'version',
        'last_updated_at',
        'included_items',
        'compatible_with',
        'benefits',
        'preview_points',
        'faq_items',
        'usage_instructions',
        'is_active',
        'sales_count',
        'rating_avg',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_free' => 'boolean',
            'price' => 'decimal:2',
            'old_price' => 'decimal:2',
            'last_updated_at' => 'datetime',
            'included_items' => 'array',
            'compatible_with' => 'array',
            'benefits' => 'array',
            'preview_points' => 'array',
            'faq_items' => 'array',
            'usage_instructions' => 'array',
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

    public function wishlistItems()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function isService(): bool
    {
        return $this->product_type === 'service';
    }

    public function serviceMissions()
    {
        return $this->hasMany(ServiceMission::class);
    }
}

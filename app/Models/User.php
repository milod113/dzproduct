<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'bio',
        'email',
        'phone',
        'wilaya',
        'password',
        'is_admin',
        'is_verified_seller',
        'is_top_rated_seller',
        'is_official_partner',
        'seller_since',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_verified_seller' => 'boolean',
            'is_top_rated_seller' => 'boolean',
            'is_official_partner' => 'boolean',
            'seller_since' => 'datetime',
        ];
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'seller_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class);
    }
}

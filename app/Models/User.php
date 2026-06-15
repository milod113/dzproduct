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
        'role',
        'seller_plan',
        'seller_plan_started_at',
        'seller_plan_expires_at',
        'whatsapp_cta_text',
        'is_verified_seller',
        'is_top_rated_seller',
        'is_official_partner',
        'seller_since',
        'is_available_for_freelance',
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
            'is_available_for_freelance' => 'boolean',
            'seller_plan_started_at' => 'datetime',
            'seller_plan_expires_at' => 'datetime',
        ];
    }

    public const SELLER_PLAN_STARTER = 'starter';
    public const SELLER_PLAN_PRO = 'pro';
    public const SELLER_PLAN_ELITE = 'elite';

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isSeller(): bool
    {
        return in_array($this->role, ['admin', 'seller'], true);
    }

    public function isClient(): bool
    {
        return $this->role === 'client';
    }

    public function sellerPlanLabel(): string
    {
        return match ($this->seller_plan) {
            self::SELLER_PLAN_PRO => 'Pro',
            self::SELLER_PLAN_ELITE => 'Elite',
            default => 'Starter',
        };
    }

    public function sellerProductLimit(): ?int
    {
        return $this->seller_plan === self::SELLER_PLAN_STARTER ? 3 : null;
    }

    public function hasUnlimitedProducts(): bool
    {
        return $this->sellerProductLimit() === null;
    }

    public function hasPrioritySupport(): bool
    {
        return $this->seller_plan === self::SELLER_PLAN_ELITE;
    }

    public function sellerPlanDurationInMonths(): int
    {
        return match ($this->seller_plan) {
            self::SELLER_PLAN_PRO, self::SELLER_PLAN_ELITE => 1,
            default => 0,
        };
    }

    public function canUseCustomWhatsappCta(): bool
    {
        return $this->seller_plan === self::SELLER_PLAN_ELITE;
    }

    public function hasSearchBoost(): bool
    {
        return in_array($this->seller_plan, [self::SELLER_PLAN_PRO, self::SELLER_PLAN_ELITE], true);
    }

    public function canAppearVerifiedByPlan(): bool
    {
        return in_array($this->seller_plan, [self::SELLER_PLAN_PRO, self::SELLER_PLAN_ELITE], true);
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

    public function receivedSellerMessages()
    {
        return $this->hasMany(SellerMessage::class, 'seller_id');
    }

    public function sentSellerMessages()
    {
        return $this->hasMany(SellerMessage::class, 'sender_id');
    }

    public function wishlistItems()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function wishlistProducts()
    {
        return $this->belongsToMany(Product::class, 'wishlists')->withTimestamps();
    }

    public function sellerPlanRequests()
    {
        return $this->hasMany(SellerPlanRequest::class, 'seller_id');
    }

    public function reviewedSellerPlanRequests()
    {
        return $this->hasMany(SellerPlanRequest::class, 'reviewed_by');
    }

    public function clientServiceMissions()
    {
        return $this->hasMany(ServiceMission::class, 'client_id');
    }

    public function sellerServiceMissions()
    {
        return $this->hasMany(ServiceMission::class, 'seller_id');
    }
}

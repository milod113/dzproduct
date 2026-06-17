<?php

namespace App\Models;

use App\Notifications\TwoFactorCodeNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

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
        'referral_code',
        'referred_by',
        'referral_balance',
        'two_factor_enabled',
        'two_factor_code',
        'two_factor_expires_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code',
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
            'referral_balance' => 'decimal:2',
            'two_factor_enabled' => 'boolean',
            'two_factor_expires_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (User $user) {
            if (empty($user->referral_code)) {
                $user->referral_code = self::generateReferralCode();
            }
        });
    }

    public static function generateReferralCode(): string
    {
        do {
            $code = 'REF-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 8));
        } while (static::where('referral_code', $code)->exists());
        return $code;
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

    public function requiresTwoFactor(): bool
    {
        return in_array($this->role, ['admin', 'seller'], true) && $this->two_factor_enabled;
    }

    public function sendTwoFactorCode(): string
    {
        $code = (string) random_int(100000, 999999);

        $this->forceFill([
            'two_factor_code' => Hash::make($code),
            'two_factor_expires_at' => now()->addMinutes(10),
        ])->save();

        $this->notify(new TwoFactorCodeNotification($code));

        return $code;
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

    public function referredBy()
    {
        return $this->belongsTo(User::class, 'referred_by');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'referred_by');
    }

    public function commissions()
    {
        return $this->hasMany(ReferralCommission::class, 'affiliate_id');
    }

    public function withdrawalRequests()
    {
        return $this->hasMany(WithdrawalRequest::class);
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

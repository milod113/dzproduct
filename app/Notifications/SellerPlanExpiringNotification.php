<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SellerPlanExpiringNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly string $planLabel,
        private readonly string $expiresAt,
        private readonly int $daysLeft
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'seller_plan_expiring',
            'title' => 'Votre plan vendeur expire bientot',
            'message' => "Votre plan {$this->planLabel} expire dans {$this->daysLeft} jour(s), le {$this->expiresAt}.",
            'action_url' => route('vendeur.plans'),
            'plan_label' => $this->planLabel,
            'expires_at' => $this->expiresAt,
            'days_left' => $this->daysLeft,
            'created_at' => now()->toDateTimeString(),
        ];
    }
}

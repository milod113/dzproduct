<?php

namespace App\Notifications;

use App\Models\SellerPlanRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SellerPlanRequestSubmittedNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly SellerPlanRequest $planRequest
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'seller_plan_request_submitted',
            'title' => 'Nouvelle demande de plan vendeur',
            'message' => "{$this->planRequest->seller?->name} a demande le plan {$this->planRequest->requested_plan}.",
            'action_url' => route('admin.seller-plan-requests'),
            'plan_request_id' => $this->planRequest->id,
            'seller_id' => $this->planRequest->seller_id,
            'requested_plan' => $this->planRequest->requested_plan,
            'requested_plan_label' => ucfirst($this->planRequest->requested_plan),
            'plan_price' => $this->planRequest->plan_price,
            'created_at' => now()->toDateTimeString(),
        ];
    }
}

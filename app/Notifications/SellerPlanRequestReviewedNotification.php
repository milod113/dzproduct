<?php

namespace App\Notifications;

use App\Models\SellerPlanRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SellerPlanRequestReviewedNotification extends Notification
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
        $isApproved = $this->planRequest->status === SellerPlanRequest::STATUS_APPROVED;

        return [
            'kind' => 'seller_plan_request_reviewed',
            'title' => $isApproved ? 'Plan vendeur approuve' : 'Demande de plan refusee',
            'message' => $isApproved
                ? "Votre plan {$this->planRequest->requested_plan} a ete active."
                : "Votre demande pour le plan {$this->planRequest->requested_plan} a ete refusee.",
            'action_url' => route('vendeur.plans'),
            'plan_request_id' => $this->planRequest->id,
            'requested_plan' => $this->planRequest->requested_plan,
            'requested_plan_label' => ucfirst($this->planRequest->requested_plan),
            'status' => $this->planRequest->status,
            'admin_note' => $this->planRequest->admin_note,
            'created_at' => now()->toDateTimeString(),
        ];
    }
}

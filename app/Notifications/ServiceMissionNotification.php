<?php

namespace App\Notifications;

use App\Models\ServiceMission;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ServiceMissionNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly ServiceMission $mission,
        private readonly string $title,
        private readonly string $message,
        private readonly string $actionUrl
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'kind' => 'service_mission',
            'title' => $this->title,
            'message' => $this->message,
            'action_url' => $this->actionUrl,
            'mission_id' => $this->mission->id,
            'mission_number' => $this->mission->mission_number,
            'status' => $this->mission->status,
            'created_at' => now()->toDateTimeString(),
        ];
    }
}

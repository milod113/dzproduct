<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TwoFactorCodeNotification extends Notification
{
    use Queueable;

    public function __construct(
        private readonly string $code,
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Votre code de verification Marketplace DZ')
            ->greeting('Bonjour ' . ($notifiable->name ?? ''))
            ->line('Un code de verification est necessaire pour acceder a votre espace securise.')
            ->line('Code: ' . $this->code)
            ->line('Ce code expire dans 10 minutes.')
            ->line('Si vous n etes pas a l origine de cette tentative, changez votre mot de passe.');
    }
}

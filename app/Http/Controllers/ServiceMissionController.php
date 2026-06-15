<?php

namespace App\Http\Controllers;

use App\Models\ServiceMission;
use App\Models\ServiceMissionMessage;
use App\Notifications\ServiceMissionNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceMissionController extends Controller
{
    public function clientIndex(Request $request)
    {
        $missions = ServiceMission::with(['product', 'seller'])
            ->where('client_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(fn (ServiceMission $mission) => $this->formatMission($mission))
            ->values();

        return Inertia::render('ServiceMissions/ClientIndex', [
            'missions' => $missions,
        ]);
    }

    public function clientShow(Request $request, int $id)
    {
        $mission = ServiceMission::with(['product', 'seller', 'client', 'messages.sender'])
            ->where('client_id', $request->user()->id)
            ->findOrFail($id);

        return Inertia::render('ServiceMissions/Show', [
            'mission' => $this->formatMissionDetail($mission, 'client'),
            'viewerRole' => 'client',
        ]);
    }

    public function sellerIndex(Request $request)
    {
        $missions = ServiceMission::with(['product', 'client'])
            ->where('seller_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(fn (ServiceMission $mission) => $this->formatMission($mission))
            ->values();

        return Inertia::render('ServiceMissions/SellerIndex', [
            'missions' => $missions,
        ]);
    }

    public function sellerShow(Request $request, int $id)
    {
        $mission = ServiceMission::with(['product', 'seller', 'client', 'messages.sender'])
            ->where('seller_id', $request->user()->id)
            ->findOrFail($id);

        return Inertia::render('ServiceMissions/Show', [
            'mission' => $this->formatMissionDetail($mission, 'seller'),
            'viewerRole' => 'seller',
        ]);
    }

    public function submitBrief(Request $request, int $id)
    {
        $mission = ServiceMission::with(['seller', 'client'])->where('client_id', $request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'brief_title' => 'required|string|max:255',
            'brief_objective' => 'required|string|max:3000',
            'brief_requirements' => 'nullable|string|max:4000',
            'brief_deadline' => 'nullable|string|max:255',
            'brief_reference_link' => 'nullable|string|max:255',
            'brief_notes' => 'nullable|string|max:3000',
        ]);

        $mission->update([
            ...$validated,
            'status' => ServiceMission::STATUS_BRIEF_SUBMITTED,
            'brief_submitted_at' => now(),
        ]);

        ServiceMissionMessage::create([
            'service_mission_id' => $mission->id,
            'sender_id' => null,
            'message_type' => 'system',
            'message' => 'Le client a soumis le brief de mission. Vous pouvez maintenant analyser la demande et demarrer le travail.',
        ]);

        $mission->seller?->notify(new ServiceMissionNotification(
            $mission,
            'Brief de mission recu',
            "Le client a rempli le brief pour {$mission->product?->name}.",
            route('vendeur.services.show', $mission->id)
        ));

        return back()->with('toast', 'Brief envoye au vendeur avec succes.');
    }

    public function addMessage(Request $request, int $id)
    {
        $mission = ServiceMission::with(['seller', 'client'])
            ->where(function ($query) use ($request) {
                $query->where('client_id', $request->user()->id)
                    ->orWhere('seller_id', $request->user()->id);
            })
            ->findOrFail($id);

        $validated = $request->validate([
            'message' => 'required|string|max:3000',
        ]);

        ServiceMissionMessage::create([
            'service_mission_id' => $mission->id,
            'sender_id' => $request->user()->id,
            'message_type' => 'user',
            'message' => $validated['message'],
        ]);

        $recipient = $mission->client_id === $request->user()->id ? $mission->seller : $mission->client;
        $actionRoute = $request->user()->role === 'seller'
            ? route('client.services.show', $mission->id)
            : route('vendeur.services.show', $mission->id);

        $recipient?->notify(new ServiceMissionNotification(
            $mission,
            'Nouveau message de mission',
            "Un nouveau message a ete ajoute pour la mission {$mission->mission_number}.",
            $actionRoute
        ));

        return back()->with('toast', 'Message envoye.');
    }

    public function sellerUpdateStatus(Request $request, int $id)
    {
        $mission = ServiceMission::with(['seller', 'client'])->where('seller_id', $request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:in_review,in_progress,delivered,revision_requested,completed,cancelled',
            'seller_delivery_message' => 'nullable|string|max:3000',
        ]);

        $attributes = [
            'status' => $validated['status'],
        ];

        if ($validated['status'] === ServiceMission::STATUS_IN_PROGRESS && !$mission->started_at) {
            $attributes['started_at'] = now();
        }

        if ($validated['status'] === ServiceMission::STATUS_DELIVERED) {
            $attributes['delivered_at'] = now();
            $attributes['seller_delivery_message'] = $validated['seller_delivery_message'] ?? null;
        }

        if ($validated['status'] === ServiceMission::STATUS_COMPLETED) {
            $attributes['completed_at'] = now();
        }

        $mission->update($attributes);

        ServiceMissionMessage::create([
            'service_mission_id' => $mission->id,
            'sender_id' => null,
            'message_type' => 'system',
            'message' => $this->statusSystemMessage($validated['status'], $validated['seller_delivery_message'] ?? null),
        ]);

        $mission->client?->notify(new ServiceMissionNotification(
            $mission,
            'Mise a jour de mission',
            "Le statut de votre mission {$mission->mission_number} est maintenant {$this->statusLabel($mission->status)}.",
            route('client.services.show', $mission->id)
        ));

        return back()->with('toast', 'Statut de mission mis a jour.');
    }

    public function clientAction(Request $request, int $id)
    {
        $mission = ServiceMission::with(['seller', 'client'])->where('client_id', $request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'action' => 'required|in:complete,revision',
            'message' => 'nullable|string|max:3000',
        ]);

        $nextStatus = $validated['action'] === 'complete'
            ? ServiceMission::STATUS_COMPLETED
            : ServiceMission::STATUS_REVISION_REQUESTED;

        $mission->update([
            'status' => $nextStatus,
            'completed_at' => $nextStatus === ServiceMission::STATUS_COMPLETED ? now() : $mission->completed_at,
        ]);

        ServiceMissionMessage::create([
            'service_mission_id' => $mission->id,
            'sender_id' => null,
            'message_type' => 'system',
            'message' => $validated['action'] === 'complete'
                ? 'Le client a valide la mission comme terminee.'
                : 'Le client a demande une revision supplementaire.',
        ]);

        if (!empty($validated['message'])) {
            ServiceMissionMessage::create([
                'service_mission_id' => $mission->id,
                'sender_id' => $request->user()->id,
                'message_type' => 'user',
                'message' => $validated['message'],
            ]);
        }

        $mission->seller?->notify(new ServiceMissionNotification(
            $mission,
            'Action client sur mission',
            $validated['action'] === 'complete'
                ? "Le client a valide la mission {$mission->mission_number}."
                : "Le client demande une revision sur la mission {$mission->mission_number}.",
            route('vendeur.services.show', $mission->id)
        ));

        return back()->with('toast', 'Action enregistree avec succes.');
    }

    private function formatMission(ServiceMission $mission): array
    {
        return [
            'id' => $mission->id,
            'mission_number' => $mission->mission_number,
            'status' => $mission->status,
            'status_label' => $this->statusLabel($mission->status),
            'product_name' => $mission->product?->name,
            'price' => (int) ($mission->product?->price ?? 0),
            'seller_name' => $mission->seller?->name,
            'client_name' => $mission->client?->name,
            'brief_title' => $mission->brief_title,
            'created_at' => $mission->created_at?->format('Y-m-d H:i'),
            'brief_submitted_at' => $mission->brief_submitted_at?->format('Y-m-d H:i'),
        ];
    }

    private function formatMissionDetail(ServiceMission $mission, string $viewerRole): array
    {
        return [
            ...$this->formatMission($mission),
            'viewer_role' => $viewerRole,
            'seller_delivery_message' => $mission->seller_delivery_message,
            'brief_objective' => $mission->brief_objective,
            'brief_requirements' => $mission->brief_requirements,
            'brief_deadline' => $mission->brief_deadline,
            'brief_reference_link' => $mission->brief_reference_link,
            'brief_notes' => $mission->brief_notes,
            'messages' => $mission->messages->sortBy('created_at')->values()->map(fn (ServiceMissionMessage $message) => [
                'id' => $message->id,
                'message_type' => $message->message_type,
                'message' => $message->message,
                'sender_name' => $message->sender?->name ?? 'Systeme',
                'is_mine' => $message->sender_id && auth()->id() === $message->sender_id,
                'created_at' => $message->created_at?->format('Y-m-d H:i'),
            ])->values(),
        ];
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            ServiceMission::STATUS_BRIEF_SUBMITTED => 'Brief soumis',
            ServiceMission::STATUS_IN_REVIEW => 'Analyse en cours',
            ServiceMission::STATUS_IN_PROGRESS => 'En production',
            ServiceMission::STATUS_DELIVERED => 'Livre',
            ServiceMission::STATUS_REVISION_REQUESTED => 'Revision demandee',
            ServiceMission::STATUS_COMPLETED => 'Termine',
            ServiceMission::STATUS_CANCELLED => 'Annule',
            default => 'Mission reservee',
        };
    }

    private function statusSystemMessage(string $status, ?string $deliveryMessage = null): string
    {
        return match ($status) {
            ServiceMission::STATUS_IN_REVIEW => 'Le vendeur analyse maintenant le brief et precise le cadre de la mission.',
            ServiceMission::STATUS_IN_PROGRESS => 'Le vendeur a demarre la production de la mission.',
            ServiceMission::STATUS_DELIVERED => $deliveryMessage
                ? 'Livraison effectuee: ' . $deliveryMessage
                : 'Le vendeur a livre la mission.',
            ServiceMission::STATUS_REVISION_REQUESTED => 'Une revision a ete demandee sur la mission.',
            ServiceMission::STATUS_COMPLETED => 'La mission a ete marquee comme terminee.',
            ServiceMission::STATUS_CANCELLED => 'La mission a ete annulee.',
            default => 'Statut de mission mis a jour.',
        };
    }
}

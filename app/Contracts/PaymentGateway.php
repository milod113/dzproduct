<?php

namespace App\Contracts;

use App\Models\Order;

interface PaymentGateway
{
    /**
     * Initialize a payment for an order.
     * Returns an array with:
     * - 'redirect_url' => URL to redirect the user to for payment
     * - 'transaction_id' => gateway transaction reference
     * - 'html_form' => (optional) auto-submit form HTML
     */
    public function initiatePayment(Order $order, array $options = []): array;

    /**
     * Verify a payment callback/notification.
     * Returns an array with:
     * - 'status' => 'completed' | 'failed' | 'pending'
     * - 'transaction_id' => gateway transaction ID
     * - 'gateway_data' => raw gateway response
     */
    public function verifyPayment(array $requestData): array;

    /**
     * Process a return (user redirected back after payment).
     */
    public function processReturn(array $requestData): array;

    /**
     * Get the display name of this gateway.
     */
    public function getName(): string;

    /**
     * Get the gateway identifier.
     */
    public function getKey(): string;

    /**
     * Check if the gateway is in test mode.
     */
    public function isTestMode(): bool;
}

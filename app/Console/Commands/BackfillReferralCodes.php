<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class BackfillReferralCodes extends Command
{
    protected $signature = 'referrals:backfill-codes';

    protected $description = 'Generate referral codes for existing users that do not have one yet';

    public function handle(): int
    {
        $users = User::query()
            ->whereNull('referral_code')
            ->orWhere('referral_code', '')
            ->get();

        if ($users->isEmpty()) {
            $this->info('All users already have referral codes.');
            return self::SUCCESS;
        }

        $count = 0;

        foreach ($users as $user) {
            $user->forceFill([
                'referral_code' => User::generateReferralCode(),
            ])->save();

            $count++;
        }

        $this->info("Referral codes generated for {$count} user(s).");

        return self::SUCCESS;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceMissionMessage extends Model
{
    protected $fillable = [
        'service_mission_id',
        'sender_id',
        'message_type',
        'message',
    ];

    public function mission()
    {
        return $this->belongsTo(ServiceMission::class, 'service_mission_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}

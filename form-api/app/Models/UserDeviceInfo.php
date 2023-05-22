<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDeviceInfo extends Model
{
    protected $fillable = ['ip_address', 'device_type', 'browser', 'user_agent'];
}

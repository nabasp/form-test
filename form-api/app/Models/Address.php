<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id', 'a1', 'a2', 'a3'];

    public function user()
    {
        return $this->belongsTo(UserDetails::class);
    }
}
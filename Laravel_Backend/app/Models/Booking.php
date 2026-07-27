<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasUuids;

    protected $fillable = ['customer_id', 'artisan_id', 'status', 'service_description'];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
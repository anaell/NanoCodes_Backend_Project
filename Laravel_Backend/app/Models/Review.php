<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasUuids;

    protected $fillable = ['comment', 'rating', 'customer_id', 'artisan_id'];
    public $timestamps = false;

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function artisan()
    {
        return $this->belongsTo(Artisan::class);
    }
}
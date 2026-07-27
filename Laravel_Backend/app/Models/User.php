<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\BankDetails;

class User extends Authenticatable
{
    use HasFactory, HasUuids, Notifiable;

    protected $fillable = [
        'role', 'email', 'password', 'phone_no', 'whatsapp_no',
        'f_name', 'l_name', 'profile_pic_url', 'nin', 'id', 'created_at', 'updated_at'
    ];

    protected $hidden = ['password'];

    public function bankDetails()
    {
        return $this->hasOne(BankDetails::class);
    }

    public function artisan()
    {
        return $this->hasOne(Artisan::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'customer_id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'customer_id');
    }

    public function isArtisan(): bool
    {
        return $this->role === 'artisan';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
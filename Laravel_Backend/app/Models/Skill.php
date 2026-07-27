<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasUuids;

    protected $fillable = ['name'];
    public $timestamps = false;

    public function artisans()
    {
        return $this->belongsToMany(Artisan::class, 'artisan_skill');
    }
}
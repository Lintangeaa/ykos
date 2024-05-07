<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'name',
        'code'
    ];
    protected static function boot()
    {
        parent::boot();

        // Register creating event to generate random code
        static::creating(function ($course) {
            $course->code = strtoupper(Str::random(4)); // Menghasilkan kode acak 8 karakter
        });
    }
    public function materials() : HasMany {
        return $this->hasMany(Material::class, 'course_id', 'id');
    }
    public function assignments() : HasMany {
        return $this->hasMany(Assignment::class, 'course_id', 'id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;
    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'name'
    ];
    public function materials() : HasMany {
        return $this->hasMany(Material::class, 'course_id', 'id');
    }
    public function assignments() : HasMany {
        return $this->hasMany(Assignment::class, 'course_id', 'id');
    }
}

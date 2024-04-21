<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    use HasFactory;
    protected $table = 'assignments';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'course_id',
        'path',
        'name'
    ];

    public function course() : BelongsTo {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
}

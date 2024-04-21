<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Feedback extends Model
{
    use HasFactory;
    protected $table = 'feedbacks';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'course_id',
        'feedback_id',
        'user_id',
        'text'
    ];

    public function course() : BelongsTo {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
    public function user() : BelongsTo {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function feedback() : BelongsTo {
        return $this->belongsTo(Feedback::class, 'feedback_id', 'id');
    }
}

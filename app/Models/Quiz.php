<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Quiz extends Model
{
    use HasFactory;
    protected $table = 'quizzes';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'course_id',
        'questions',
        'answer_keys'
    ];

    public function course(): BelongsTo {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
    protected function casts(): array
    {
        return [
            'questions' => 'array',
            'answer_keys' => 'array',
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizAnswer extends Model
{
    use HasFactory;
    protected $table = 'quizzes';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'quiz_id',
        'user_id',
        'score',
        'answer'
    ];

    public function quiz(): BelongsTo {
        return $this->belongsTo(Quiz::class, 'quiz_id', 'id');
    }
    public function user() : BelongsTo {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    
    protected function casts(): array
    {
        return [
            'answer' => 'array',
        ];
    }
}

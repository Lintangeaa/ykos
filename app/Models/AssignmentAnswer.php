<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssignmentAnswer extends Model
{
    use HasFactory;
    protected $table = 'assignment_answers';
    protected $primaryKey = 'id';
    protected $keyType = 'int';
    public $timestamps = true;
    public  $incrementing = true;
    protected $fillable = [
        'assignment_id',
        'user_id',
        'path',
        'score'
    ];

    public function assignment() : BelongsTo {
        return $this->belongsTo(Assignment::class, 'assignment_id', 'id');
    }
    public function user() : BelongsTo {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\AssignmentAnswer;
use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizAnswerController extends Controller
{
    public function index($user_id) {

        // Get quiz scores for the specified course and user (excluding scores of 0)
        $quizScores = QuizAnswer::where('user_id', $user_id)
                                 ->where('score', '!=', 0)
                                 ->with('user', 'quiz', 'quiz.course')
                                 ->get() ?? [];
      
        // Get assignment scores for the specified course and user (excluding scores of 0)
        $assignmentScores = AssignmentAnswer::where('user_id', $user_id)
                                             ->where('score', '!=', 0)
                                             ->with('user', 'assignment', 'assignment.course')
                                             ->get() ?? [];
      
        // Prepare data to be passed to the view
        $datas = [
            'quizScores' => $quizScores,
            'assignmentScores' => $assignmentScores,
        ];
      
        // Render the 'Score/Index' view with the prepared data
        return Inertia::render('Score/Index', $datas);
      }
}

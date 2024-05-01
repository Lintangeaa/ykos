<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index($course_id) {
        $quizs = Quiz::where('course_id', $course_id)->first();
        return Inertia::render('Quiz/Index', [
            'assignment' => $quizs,
            'course_id' => $course_id,
        ]);
    }
}

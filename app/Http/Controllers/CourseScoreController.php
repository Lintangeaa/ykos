<?php

namespace App\Http\Controllers;

use App\Models\Course; // Import model Course
use App\Models\AssignmentAnswer;
use App\Models\QuizAnswer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseScoreController extends Controller
{
  public function getByCourseId($course_id)
  {
    // Get course name based on the provided course_id
    $courseName = Course::where('id', $course_id)->value('name');

    // Get quiz scores for the specified course (excluding scores of 0)
    $quizScores = QuizAnswer::whereHas('quiz', function ($query) use ($course_id) {
      $query->where('course_id', $course_id);
    })
      ->where('score', '!=', 0)
      ->with('quiz', 'user')
      ->get();

    // Get assignment scores for the specified course (excluding scores of 0)
    $assignmentScores = AssignmentAnswer::whereHas('assignment', function ($query) use ($course_id) {
      $query->where('course_id', $course_id);
    })
      ->where('score', '!=', 0)
      ->with('assignment', 'user')
      ->get();

    // Prepare data to be passed to the view
    $data = [
      'courseName' => $courseName, // Set the course name
      'quizScores' => $quizScores,
      'assignmentScores' => $assignmentScores,
    ];

    // Render the 'Score/Course/Index' view with the prepared data
    return Inertia::render('Score/Course/Index', $data);
  }
}

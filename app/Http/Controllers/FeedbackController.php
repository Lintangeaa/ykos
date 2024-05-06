<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index($course_id) {
        $quiz = Quiz::where('course_id', $course_id)->first();
        $feedbacks = Feedback::where('course_id', $course_id)->with('user')->get() ?? [];
        $datas = [
            'feedbacks' => $feedbacks,
            'quiz' => $quiz,
            'course_id' => $course_id
        ];

        return Inertia::render('Feedback/Index', $datas);
    }

    public function store(Request $request, $course_id) {
        $feedback_id = $request['feedback_id'];
        $user_id = $request['user_id'];
        $text = $request['text'];
        // dd($course_id, $feedback_id, $user_id, $text);
        DB::beginTransaction();
        try {
            Feedback::create([
                'course_id' => $course_id,
                'feedback_id' => $feedback_id,
                'user_id' => $user_id,
                'text' => $text
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return redirect()->route('feedbacks.index', $course_id);
    }

    public function delete($course_id, $id) {
        DB::beginTransaction();
        try {
            Feedback::find($id)->delete();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }

        return redirect()->route('feedbacks.index', $course_id);
    }
}

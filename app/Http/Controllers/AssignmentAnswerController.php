<?php

namespace App\Http\Controllers;

use App\Models\AssignmentAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AssignmentAnswerController extends Controller
{


    public function submitAssignment(Request $request, $course_id, $assignment_id) {
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx',
        ]);
        $user = auth()->user();
        $exists = AssignmentAnswer::where('assignment_id', $assignment_id)->where('user_id', $user->id)->first();
        DB::beginTransaction();
        try {
            $filePath = $request->file('file')->store('files', ['disk' => 'custom']);
            if($exists) {
                $exists->path = $filePath;
                $exists->save();
            } else {
                AssignmentAnswer::create([
                    'assignment_id' => $assignment_id,
                    'user_id' => $user->id,
                    'path' => $filePath,
                    'score' => 0
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return redirect()->route('assignments.all', $course_id);
    }

    public function updateScore(Request $request, $course_id, $assignment_id, $answer_id) {
        $validated = $request->validate([
            'score' => 'required|integer',
        ]);
        $answer = AssignmentAnswer::findOrFail($answer_id);
        DB::beginTransaction();
        try {
            $answer->update($request->all());
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return redirect()->route('assignments.all', $course_id);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Http\Resources\AssignmentCollection;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use App\Models\AssignmentAnswer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function getAll($course_id): Response 
    {
        $assignment = Assignment::where('course_id', $course_id)->with('course')->first(); 
        $siswa_submitted = null; // Default value
        $assignments = null;
        // Pengecekan peran pengguna
        if (auth()->user()->role == "siswa" && isset($assignment)) {
            $alreadySubmit = AssignmentAnswer::where('assignment_id', $assignment->id)
                ->where('user_id', auth()->user()->id)
                ->first();
            // Mengubah nilai siswa_submitted berdasarkan hasil pengecekan
            $siswa_submitted = $alreadySubmit ? true : false;
        } else if (auth()->user()->role != "siswa" && isset($assignment)) {
            $assignments = AssignmentAnswer::where('assignment_id', $assignment->id)->with('user')->get();
        }
        
        return Inertia::render('Assignment/All', [
            'assignment' => isset($assignment) ? new AssignmentResource($assignment) : null,
            'course_id' => $course_id,
            'siswa_submitted' => $siswa_submitted,
            'assignments' => $assignments,
        ]);
    }
    
    
    

    public function create($course_id): Response  {
        return Inertia::render('Assignment/Create', [
            'course_id' => $course_id,
        ]);
    }

    public function store(CreateAssignmentRequest $request, $course_id): RedirectResponse {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $filePath = $request->file('file')->store('files', 'public');
            $uploadedFile = '/storage/' . $filePath;
            $assignment = Assignment::where('course_id', $course_id)->first();
            if($assignment) {
                $assignment->name = $data['name'];
                $assignment->path = $uploadedFile;
                $assignment->save();
            } else {
                Assignment::create([
                    'name' => $data['name'],
                    'course_id' => $course_id,
                    'path' => $uploadedFile
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            dd($th);
            DB::rollBack();
        }
    
        return Redirect::to('/courses/'. $course_id . '/assignments' )->with('success', 'Assignment created successfully.');
    }
    
    public function update(Request $request, $course_id, $id ) {
        $course = Assignment::findOrFail($id);
    
        // Comprehensive validation with nullable handling
        $validated = $request->validate([
            'name' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx', // Ensure file validation
            'course_id' => 'nullable|exists:courses,id',
        ]);
        // dd('req',$request->all());
        $data = []; // Initialize empty data array
    
        // Update data selectively based on validated values
        if (array_key_exists('name', $validated) && $validated['name'] !== null) {
            $data['name'] = $validated['name'];
        }
    
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('files', 'public');
            $uploadedFile = '/storage/' . $filePath;
            $data['path'] = $uploadedFile;
        }
    
        if (array_key_exists('course_id', $validated) && $validated['course_id'] !== null) {
            $data['course_id'] = $validated['course_id'];
        }
        // dd($data);
        // Update the Assignment model with the filtered data
        $course->update($data);
        
        return Redirect::to('/courses/'. $course_id . '/assignments')->with('success', 'Assignment updated successfully.');
    }
    
    
    public function edit($course_id, $id): Response  {
        $material = Assignment::findOrFail($id);
        return Inertia::render('Assignment/Edit', [
            'material' => $material,
            'course_id' => $course_id,
        ]);
    }

    public function delete($course_id, $id): RedirectResponse {
        $course = Assignment::findOrFail($id);
        $course->delete();
        return Redirect::to('/courses/'. $course_id . '/assignments' );
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Http\Resources\AssignmentCollection;
use App\Http\Resources\AssignmentResource;
use App\Models\Assignment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function getAll($course_id): Response 
    {
        $assignment = Assignment::where('course_id', $course_id)->first();    
        return Inertia::render('Assignment/All', [
            'assignment' => new AssignmentResource($assignment),
            'course_id' => $course_id,
        ]);
    }
    

    public function create($course_id): Response  {
        return Inertia::render('Assignment/Create', [
            'course_id' => $course_id,
        ]);
    }

    public function store(CreateAssignmentRequest $request, $course_id): RedirectResponse {
        $data = $request->validated();
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

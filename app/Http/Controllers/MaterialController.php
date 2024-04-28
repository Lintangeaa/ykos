<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMaterialRequest;
use App\Http\Resources\MaterialCollection;
use App\Models\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class MaterialController extends Controller
{
    public function getAll($course_id): Response 
    {
        $materials = Material::where('course_id', $course_id)->get();    
        return Inertia::render('Material/All', [
            'materials' => new MaterialCollection($materials),
            'course_id' => $course_id,
        ]);
    }
    

    public function create($course_id): Response  {
        return Inertia::render('Material/Create', [
            'course_id' => $course_id,
        ]);
    }

    public function store(CreateMaterialRequest $request, $course_id): RedirectResponse {
        $data = $request->validated();
        $filePath = $request->file('file')->store('files', 'public');
        $uploadedFile = '/storage/' . $filePath;
        Material::create([
            'name' => $data['name'],
            'course_id' => $course_id,
            'path' => $uploadedFile
        ]);
    
        return Redirect::to('/courses/'. $course_id . '/materials' )->with('success', 'Material created successfully.');
    }
    
    public function update(Request $request, $course_id, $id ) {
        $course = Material::findOrFail($id);
    
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
        // Update the Material model with the filtered data
        $course->update($data);
        
        return Redirect::to('/courses/'. $course_id . '/materials')->with('success', 'Material updated successfully.');
    }
    
    
    public function edit($course_id, $id): Response  {
        $material = Material::findOrFail($id);
        return Inertia::render('Material/Edit', [
            'material' => $material,
            'course_id' => $course_id,
        ]);
    }

    public function delete($course_id, $id): RedirectResponse {
        $course = Material::findOrFail($id);
        $course->delete();
        return Redirect::to('/courses/'. $course_id . '/materials' );
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseRequest;
use App\Http\Resources\CourseCollection;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function getAll(Request $request): Response 
    {
        $courses = Course::all();    
        return Inertia::render('Course/All', [
            'courses' => new CourseCollection($courses)
        ]);
    }
    

    public function create(): Response  {
        return Inertia::render('Course/Create');
    }

    public function store(CreateCourseRequest $request): RedirectResponse {
        $data = $request->validated();
    
        Course::create([
            'name' => $data['name'],
        ]);
    
        return Redirect::to('/courses')->with('success', 'Course created successfully.');
    }
    
    public function update(Request $request, $id) {
        $course = Course::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            // Add other fields validation as needed
        ]);
    
        $data = $request->only(['name']);
    
        $course->update($data);
    
        return Redirect::to('/courses')->with('success', 'Course updated successfully.');
    }
    
    public function edit($id): Response  {
        $course = Course::findOrFail($id);
        return Inertia::render('Course/Edit', [
            'course' => $course
        ]);
    }

    public function delete($id): RedirectResponse {
        $course = Course::findOrFail($id);
        $course->delete();
        return Redirect::to('/courses');
    }

}

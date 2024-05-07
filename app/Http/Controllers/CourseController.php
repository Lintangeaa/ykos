<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseRequest;
use App\Http\Resources\CourseCollection;
use App\Models\Course;
use App\Models\CourseUser;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
class CourseController extends Controller
{
    public function getAll(Request $request): Response 
    {
        $courses = [];
        $user = auth()->user();
        if($user->role == "guru") {
            $raws = CourseUser::where("user_id", $user->id)->with('course')->get();
            foreach ($raws as $r) {
                $courses[] = $r->course;
            }
        } else if($user->role == "siswa"){
            $courses = Course::all();  
            $raws = CourseUser::where("user_id", $user->id)->with('course')->get()->map(function($item) {
                return $item->course->id;
            });
            foreach ($courses as $r) {
                $r['isHaveAccess'] = $raws->contains($r->id);
            }
        } else {
            $courses = Course::all();  
        }
  
        return Inertia::render('Course/All', [
            'courses' => $courses
        ]);
    }
    

    public function create(): Response  {
        return Inertia::render('Course/Create');
    }

    public function teachers(Request $request, $course_id) {
        $teachers = CourseUser::where('course_id', $course_id)->with('user')->get();
        // dd($teachers);
        return Inertia::render('Course/AssignTeacher', [
            'teachers' => $teachers,
            'course_id' => $course_id
        ]);
    }

    public function addTeacherToCourse(Request $request, $course_id) {
        // dd($request->all());
        $exists = CourseUser::where('user_id', $request['id'])->where('course_id', $course_id)->first();
        if(!$exists) {
            CourseUser::create([
                'user_id' => $request['id'],
                'course_id' => $course_id
            ]);
        }

        return redirect()->back();
    }
    
    public function unlockCourse(Request $request, $code, $user_id) {
        $course = Course::where('code', $code)->first();
        // dd($course);
        if(!$course) {
            return response()->json([
                'status' => false
            ]);
        }
        DB::beginTransaction();
        try {
            CourseUser::create([
                'user_id' => $user_id,
                'course_id' => $course->id
            ]);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return response()->json([
            'status' => true
        ]);
    }

    public function store(CreateCourseRequest $request): RedirectResponse {
        $data = $request->validated();
        $user = auth()->user();
        DB::beginTransaction();
        try {
            $course = Course::create([
                'name' => $data['name'],
            ]);
            if($user->role == "guru") {
                CourseUser::create([
                    'course_id' => $course->id,
                    'user_id' => $user->id
                ]);
            }
            DB::commit();
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
        }
    
        return Redirect::to('/courses')->with('success', 'Course created successfully.');
    }
    
    public function update(Request $request, $id) {
        $course = Course::findOrFail($id);
    
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:4',
            // Add other fields validation as needed
        ]);
    
        $data = $request->only(['name', 'code']);
    
        DB::beginTransaction();
        try {
            $course->update($data);
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    
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

    public function unlinkTeacherToCourse($id, $course_id) {
        $course = CourseUser::findOrFail($id);
        $course->delete();
        return response()->json([
            'status' => true
        ]);
    }
}

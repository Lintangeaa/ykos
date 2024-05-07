<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/uploadfile', [UserController::class, 'uploadFile'])->name('upload.file');
Route::post('/deletefile', [UserController::class, 'deleteFile'])->name('delete.file');

Route::post('/createQuiz/{course_id}', [QuizController::class, 'store'])->name('quiz.store');
Route::post('/unlockcourse/{code}/{user_id}', [CourseController::class, 'unlockCourse'])->name('unlock.course');
Route::get('/teachers', [UserController::class, 'getTeachers'])->name('teachers');
Route::post('/teachers/{course_id}', [CourseController::class, 'addTeacherToCourse'])->name('teachers.assign');
Route::delete('/teachers/{id}/{course_id}', [CourseController::class, 'unlinkTeacherToCourse'])->name('teachers.deleteassign');
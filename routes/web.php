<?php

use App\Http\Controllers\AssignmentAnswerController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizAnswerController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseScoreController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/users', [UserController::class, 'getAll'])->name('users.all');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'delete'])->name('users.delete');
    Route::get('/users/{id}', [UserController::class, 'edit'])->name('users.edit');

    Route::prefix('/scores')->group(function () {
        Route::get('/{user_id}', [QuizAnswerController::class, 'index'])->name('scores.index');
    });

    Route::prefix('/courses')->group(function () {
        Route::get('', [CourseController::class, 'getAll'])->name('courses.all');
        Route::get('/create', [CourseController::class, 'create'])->name('courses.create');
        Route::post('', [CourseController::class, 'store'])->name('courses.store');
        Route::put('/{id}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('/{id}', [CourseController::class, 'delete'])->name('courses.delete');
        Route::get('/{id}', [CourseController::class, 'edit'])->name('courses.edit');

        Route::prefix('/{courses_id}')->group(function () {
            Route::prefix('/materials')->group(function () {
                Route::get('', [MaterialController::class, 'getAll'])->name('materials.all');
                Route::get('/create', [MaterialController::class, 'create'])->name('materials.create');
                Route::post('', [MaterialController::class, 'store'])->name('materials.store');
                Route::post('/{id}', [MaterialController::class, 'update'])->name('materials.update');
                Route::delete('/{id}', [MaterialController::class, 'delete'])->name('materials.delete');
                Route::get('/{id}', [MaterialController::class, 'edit'])->name('materials.edit');
            });

            Route::prefix('/quizzes')->group(function () {
                Route::get('', [QuizController::class, 'index'])->name('quizzes.all');
                Route::get('/{id}', [QuizController::class, 'execQuiz'])->name('quizzes.exec');
                Route::post('/{id}', [QuizController::class, 'tempSaveAns'])->name('quizzes.temp');
            });

            Route::prefix('/teachers')->group(function () {
                Route::get('', [CourseController::class, 'teachers'])->name('courses.teachers');
            });

            Route::prefix('/feedbacks')->group(function () {
                Route::get('', [FeedbackController::class, 'index'])->name('feedbacks.index');
                Route::post('', [FeedbackController::class, 'store'])->name('feedbacks.store');
            });


            Route::prefix('/assignments')->group(function () {
                Route::get('', [AssignmentController::class, 'getAll'])->name('assignments.all');
                Route::get('/create', [AssignmentController::class, 'create'])->name('assignments.create');
                Route::post('', [AssignmentController::class, 'store'])->name('assignments.store');
                Route::post('/{id}', [AssignmentController::class, 'update'])->name('assignments.update');
                Route::delete('/{id}', [AssignmentController::class, 'delete'])->name('assignments.delete');
                Route::get('/{id}', [AssignmentController::class, 'edit'])->name('assignments.edit');

                Route::prefix('/{assignment_id}')->group(function () {
                    Route::prefix('/answers')->group(function () {
                        Route::post('', [AssignmentAnswerController::class, 'submitAssignment'])->name('assignmentsans.store');
                        Route::post('/{id}', [AssignmentAnswerController::class, 'updateScore'])->name('assignmentsans.updatescore');
                    });
                });
            });

            Route::prefix('/scores')->group(function () {
                Route::get('', [CourseScoreController::class, 'getByCourseId'])->name('course.scores');
            });
        });
    });
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\CourseUser;
use App\Models\Quiz;
use App\Models\QuizAnswer;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(Request $request, $course_id) {
        $quiz = Quiz::where('course_id', $course_id)->first();
        $data = [];
        $alreadyAnswer = null;

        if(auth()->user()->role != "siswa") {
            if(isset($quiz)) {
                $questions = json_decode($quiz->questions);
                $answers = json_decode($quiz->answer_keys);
                foreach ($questions as $key => $value) {
                    $questionData = [
                        'question' => $value->question,
                        'options' => $value->options,
                        'images' => $value->images,
                        'answer' => isset($answers[$key]) ? $answers[$key] : null 
                    ];
                    $data[] = $questionData;
                }
            }
        } else if(auth()->user()->role == "siswa" && isset($quiz)) {
            $data = $quiz;
            if(QuizAnswer::where('quiz_id', $quiz->id)->where('user_id', auth()->user()->id)->first()) {
                return redirect()->route('quizzes.exec', [$course_id, $quiz->id]);
            }
        }
        
        return Inertia::render('Quiz/Index', [
            'quizzes' => $data,
            'course_id' => $course_id,
            'alreadyAnswer' => $alreadyAnswer 
        ]);
    }
    

    public function store(Request $request, $course_id) {
        DB::beginTransaction();
        try {
            $existingQuiz = Quiz::where('course_id', $course_id)->first();
            if($existingQuiz) {
                // Jika sudah ada, perbarui data
                $existingQuiz->update([
                    'questions' => json_encode($request['questions']),
                    'answer_keys' => json_encode($request['answers'])
                ]);
                $quiz = $existingQuiz;
            } else {
                // Jika belum ada, buat data baru
                $quiz = Quiz::create([
                    'questions' => json_encode($request['questions']),
                    'answer_keys' => json_encode($request['answers']),
                    'course_id' => $course_id
                ]);
            }
            DB::commit();
        } catch(\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        return response()->json([
            'status' => true,
            'data' => $quiz
        ], 200);
    }
    
    public function execQuiz(Request $request, $course_id, $id) {
        $quiz = Quiz::where('id', $id)->first();
        $answer = QuizAnswer::where('quiz_id', $id)
                            ->where('user_id', auth()->user()->id)
                            ->first();
    
        if (!$answer) {
            DB::beginTransaction();
            try {
                $answer = QuizAnswer::create([
                    'quiz_id' => $id,
                    'user_id' => auth()->user()->id,
                    'answer' => json_encode([]),
                    'score' => 0
                ]);
                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                throw $th;
            }
        }
        
        $number = (int)$request->input('questionNum') ?? 0;
        $questions = [];
        $currentNumber = $number;
        $answerIndex = null;
    
        // Handle nullable quiz questions
        if ($quiz && isset(json_decode($quiz->questions)[$number])) {
            $questions = (json_decode($quiz->questions)[$number]) ?? "Question Not Found";
        }
    
        // Handle nullable quiz answers
        if ($answer && isset(json_decode($answer->answer)[$number])) {
            $answerIndex = json_decode($answer->answer)[$number];
        }
        $data = [
            'questions' => $questions,
            'currentNumber' => $currentNumber,
            'totalQuestion' =>count(json_decode($quiz->questions)),
            'answerIndex' => $answerIndex,
            'course_id' => $course_id,
            'quiz_id' => $id,
            'isSubmitted' => $answer->score != 0,
        ];
    
        return Inertia::render('Quiz/Exec', $data);
    }

    public function tempSaveAns(Request $request, $course_id, $id) {
        $answer = $request['answer'];
        $questionIndex = $request['questionNum'];
    
        try {
            DB::beginTransaction();
    
            $qa = QuizAnswer::where('quiz_id', $id)
                ->where('user_id', auth()->user()->id)
                ->first();
    
            $isSubmit = $request['isSubmit'];
    
            $data = json_decode($qa->answer);
    
            $data[$questionIndex] = $answer;
    
            $qa->answer = json_encode($data);
            
            if($isSubmit) {
                $quiz = Quiz::where('id', $id)->first();
    
                $answer_keys = json_decode($quiz->answer_keys);
    
                $correctAnswers = $this->countMatchingValuesAndIndices($answer_keys, $data);
    
                $score = $this->calculateDynamicScore(count($answer_keys), $correctAnswers);
                $qa->score = $score;
            }
    
            $qa->save();
    
            DB::commit();
    
            return redirect()->route('quizzes.exec', [$course_id, $id, 'questionNum' => (int)$questionIndex + 1]);
    
        } catch (\Exception $e) {
            DB::rollback();
            // Handle exception (log, display error message, etc.)
            return redirect()->back()->with('error', 'An error occurred while saving the answer.');
        }
    }
    

    public function countMatchingValuesAndIndices($array1, $array2) {
        $matchingCount = 0;
    
        for ($i = 0; $i < count($array1); $i++) {
            for ($j = 0; $j < count($array2); $j++) {
                if ($array1[$i] == $array2[$j] && $i == $j) {
                    $matchingCount++;
                }
            }
        }
    
        return $matchingCount;
    }
    
    public function calculateDynamicScore($totalQuestions, $correctAnswers) {
        if ($totalQuestions <= 0 || $correctAnswers < 0) {
            throw new Exception("Invalid input parameters. Total questions and correct answers must be positive integers.");
        }
    
        $score = 0;
        $percentage = ($correctAnswers / $totalQuestions) * 100;
    
        if ($percentage <= 50) {
            $score = $percentage;
        } else {
            $score = 50 + (2 * ($percentage - 50));
            if ($score > 100) {
                $score = 100;
            }
        }
    
        return $score;
    }
    
    
}

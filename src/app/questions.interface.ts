export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
    selectedAnswer: string | null;
    userAnswer: string | number;
} 

export interface Results {
    results: Question[]
}
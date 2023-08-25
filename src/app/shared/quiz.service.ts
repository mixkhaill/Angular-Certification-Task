import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question, Results } from './questions.model';
import { Category, Categories } from './categories.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private apiUrl = 'https://opentdb.com/api.php?amount=5';
  private categoryUrl = 'https://opentdb.com/api_category.php';
  private difficulties: string[] = ['easy', 'medium', 'hard'];
  private generatedQuiz = new BehaviorSubject<Question[]>([]);
  private userAnswers = new BehaviorSubject<[number, string][]>([]);

  constructor(private http: HttpClient) {}

  getQuestions(category: number, difficulty: string): Observable<Results> {
    const url = `${this.apiUrl}&category=${category}&difficulty=${difficulty}`;
    console.log(this.generatedQuiz);
    return this.http.get<Results>(url);
  }
  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.categoryUrl);
  }
  getDifficulties(): string[] {
    return this.difficulties;
  }
  setGeneratedQuiz(questions: Question[]): void {
    this.generatedQuiz.next(questions);
  }
  getGeneratedQuestions(): Observable<Question[]> {
    return this.generatedQuiz.asObservable();
  }
  setUserAnswers(answers: [number, string][]): void {
    this.userAnswers.next(answers);
  }
  getUserAnswers(): Observable<[number, string][]> {
    return this.userAnswers.asObservable();
  }
  clearGeneratedQuiz(): void {
    this.generatedQuiz.next([]);
  }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Question } from "./question.interface";
import { Category } from "./category.interface"

@Injectable({
    providedIn: "root",
  })

  export class QuizService {
    private apiUrl = "https://opentdb.com/api.php?amount=5"
    private categoryUrl = "https://opentdb.com/api_category.php"
    private difficulties: string[] = ["easy", "medium", "hard"]; 
    private generatedQuiz = new Subject<Question[]>();

    constructor(private http: HttpClient) {}
    
    getQuestions(category: number, difficulty: string): Observable<{ results: Question[] }> {
      const url = `${this.apiUrl}&category=${category}&difficulty=${difficulty}`;
      return this.http.get<{ results: Question[] }>(url);
    }
    getCategories(): Observable<any> {
      return this.http.get(this.categoryUrl);
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
  }
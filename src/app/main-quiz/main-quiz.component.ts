import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../question.interface';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from "rxjs";


@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.css']
})
export class MainQuizComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  selectedAnswers: Map<number, string> = new Map();
  private quizSubscription: Subscription | undefined;
  constructor(private quizService: QuizService, private router: Router) {}

  shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
  }
  shuffleAnswers(question: Question): void {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    this.shuffleArray(allAnswers);
    question.answers = allAnswers;
  }

  ngOnInit(): void {
    this.quizSubscription =  this.quizService.getGeneratedQuestions().subscribe((questions) => {
    this.questions = questions;
    this.questions.forEach((question) => {
    this.shuffleAnswers(question);
      });
    });
  }

  selectAnswer(qIndex: number, answer: string): void {
    this.selectedAnswers.set(qIndex, answer);
  }

  isAllAnswersSelected(): boolean {
    return this.questions.every((_, qIndex) => this.selectedAnswers.has(qIndex));
  } 

  onSubmit() {
    this.router.navigate(['/results'], {
      queryParams: {
        questions: JSON.stringify(this.questions),
        userAnswers: JSON.stringify(Array.from(this.selectedAnswers.entries()))
      }
    });
  } 
  
  ngOnDestroy(): void {
    
      this.quizSubscription?.unsubscribe();
    
  }
}

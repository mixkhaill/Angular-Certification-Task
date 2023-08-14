import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../shared/questions.model';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.css'],
})
export class MainQuizComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  selectedAnswers: Map<number, string> = new Map();
  private quizSubscription!: Subscription;
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
    this.quizSubscription = this.quizService
      .getGeneratedQuestions()
      .subscribe((questions) => {
        this.questions = questions;
        this.questions.forEach((question) => {
          this.shuffleAnswers(question);
        });
      });
  }

  selectAnswer(qI: number, answer: string): void {
    this.selectedAnswers.set(qI, answer);
  }

  isAllAnswersSelected(): boolean {
    return this.questions.every((_, qI) => this.selectedAnswers.has(qI));
  }

  onSubmit(): void {
    const userAnswers: [number, string][] = Array.from(
      this.selectedAnswers.entries()
    );
    this.quizService.setUserAnswers(userAnswers);
    this.router.navigate(['/results']);
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }
}

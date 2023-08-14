import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../shared/questions.model';
import { Subscription } from 'rxjs';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  correctAnswers: number = 0;
  private quizSubscription!: Subscription;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() {
    this.quizSubscription = this.quizService
      .getGeneratedQuestions()
      .subscribe((questions) => {
        this.questions = questions;
        this.quizService.getUserAnswers().subscribe((userAnswers) => {
          userAnswers.forEach(([questionIndex, answer]) => {
            const question = this.questions[questionIndex];
            question.userAnswer = answer;
            if (question.userAnswer === question.correct_answer) {
              this.correctAnswers++;
            }
          });
        });
      });
    if (this.questions.length === 0) {
      this.router.navigate(['/']);
    }
  }

  createNewQuiz(): void {
    this.quizService.clearGeneratedQuiz();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.quizSubscription?.unsubscribe();
  }
}

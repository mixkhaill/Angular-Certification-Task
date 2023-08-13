import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Question } from '../questions.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  correctAnswersCount: number = 0; 
  private quizSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.quizSubscription = this.route.queryParams.subscribe(params => {
      if (params['questions'] && params['userAnswers']) {
        const questionsJson = params['questions'];
        const userAnswersJson = params['userAnswers'];
        const questions: Question[] = JSON.parse(questionsJson);
        const userAnswers: [number, string][] = JSON.parse(userAnswersJson);

        userAnswers.forEach(([questionIndex, answer]) => {
          const question = questions[questionIndex];
          question.userAnswer = answer;
          if (question.userAnswer === question.correct_answer) {
            this.correctAnswersCount++; 
          }
        });

        this.questions = questions;
        console.log("results: ", this.questions);
        console.log("correctAnswersCount: ", this.correctAnswersCount);
      }
    });
  }

  ngOnDestroy() {
    this.quizSubscription?.unsubscribe();
  }
}
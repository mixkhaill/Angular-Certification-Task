import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Question } from '../shared/questions.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  correctAnswers: number = 0; 
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
          console.log(question)
          if (question.userAnswer === question.correct_answer) {
            this.correctAnswers++; 
          }
        });

        this.questions = questions;
      }
    });
  }

  ngOnDestroy() {
    this.quizSubscription?.unsubscribe();
  }
}
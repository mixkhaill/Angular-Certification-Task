import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  private quizSubscription: Subscription | undefined;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   this.quizSubscription = this.route.queryParams.subscribe(params => {
      if (params['questions'] && params['userAnswers']) {
        const questionsJson = params['questions'];
        const userAnswersJson = params['userAnswers'];
        const questions: Question[] = JSON.parse(questionsJson);
        const userAnswers: [number, string][] = JSON.parse(userAnswersJson);

        userAnswers.forEach(([questionIndex, answer]) => {
          questions[questionIndex].userAnswer = answer;
        });

        this.questions = questions;
        console.log("results: ", this.questions)
      }
    });
  }
  ngOnDestroy() {
    this.quizSubscription?.unsubscribe()
  }
}

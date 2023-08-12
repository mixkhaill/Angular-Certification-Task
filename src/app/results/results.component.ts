import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.interface';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  questions: any[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('queryParams:', params);
      if (params) {
        const questionsJson = JSON.parse(params['questions']);
        this.questions = JSON.parse(questionsJson);
        const userAnswers = JSON.parse(params['userAnswers']);
        this.questions.forEach((question, index) => {
          question.userAnswer = userAnswers[index];
        });
      }
    });
  }
}

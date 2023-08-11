import { Component } from '@angular/core';
import { Question } from '../question.interface';
import { QuizService } from '../quiz.service';


@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.css']
})
export class MainQuizComponent {
  questions: Question[] = [];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getGeneratedQuestions().subscribe((questions) => {
        this.questions = questions;
        console.log("questions: ", this.questions);
    });
}
}

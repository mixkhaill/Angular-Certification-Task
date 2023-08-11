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
    this.quizService.getGeneratedQuestions().subscribe((questions) => {
        this.questions = questions;
        this.questions.forEach((question) => {
          this.shuffleAnswers(question);
      });
        console.log("questions: ", this.questions);
    });
}
}

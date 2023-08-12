import { Component } from '@angular/core';
import { Question } from '../question.interface';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-quiz',
  templateUrl: './main-quiz.component.html',
  styleUrls: ['./main-quiz.component.css']
})
export class MainQuizComponent {
  questions: Question[] = [];
  selectedAnswers: Map<number, string> = new Map();

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
      this.quizService.getGeneratedQuestions().subscribe((questions) => {
          this.questions = questions;
          this.questions.forEach((question) => {
            this.shuffleAnswers(question);
        });
          console.log("questions: ", this.questions);
      });
  }

  selectAnswer(qIndex: number, answer: string): void {
    this.selectedAnswers.set(qIndex, answer);
    console.log(this.selectedAnswers)
  }

  isAllAnswersSelected(): boolean {
    return this.questions.every((_, qIndex) => this.selectedAnswers.has(qIndex));
  }
  onSubmit() {
    
    this.router.navigate(['/results'], { queryParams: { questions: JSON.stringify(this.questions) } });
  }
}

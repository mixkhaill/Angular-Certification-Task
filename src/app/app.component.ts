import { Component } from '@angular/core';
import { QuizService } from './quiz.service';
import { Question } from './question.interface';
import { Category } from './category.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Angular-Certification';
    questions: Question[] = []
    categories: Category[] = [];
    difficulties: string[] = [];
    selectedCategory: number | null = null;
    selectedDifficulty: string | null = null;
    constructor(private quizService: QuizService) {}

    ngOnInit(): void {
      this.loadCategories();
      this.loadDifficulties();
    }

  loadCategories() {
    this.quizService.getCategories().subscribe((data) => {
    this.categories = data.trivia_categories;
      });
  }
    loadDifficulties() {
    this.difficulties = this.quizService.getDifficulties();
  }

   onCreateQuiz() {
    let category = this.selectedCategory
    let difficulty = this.selectedDifficulty
    if(category !== null && difficulty !== null) {
      this.quizService.getQuestions(category, difficulty).subscribe((data) => {
        this.questions = data.results
        this.quizService.setGeneratedQuiz(this.questions);
      })
    } 
   }
}

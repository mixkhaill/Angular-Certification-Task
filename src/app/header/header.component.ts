import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Question } from '../question.interface';
import { Category } from '../category.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  questions: Question[] = []
  categories: Category[] = [];
  difficulties: string[] = [];
  selectedCategory: number | null = null;
  selectedDifficulty: string | null = null;
  private quizSubscription: Subscription | undefined;
  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadDifficulties();
  }

  loadCategories(): void {
  this.quizSubscription = this.quizService.getCategories().subscribe((data) => {
  this.categories = data.trivia_categories;
    });
}
  loadDifficulties(): void {
  this.difficulties = this.quizService.getDifficulties();
}

 onCreateQuiz(): void {
  let category = this.selectedCategory
  let difficulty = this.selectedDifficulty
  if(category !== null && difficulty !== null) {
    this.quizService.getQuestions(category, difficulty).subscribe((data) => {
      this.questions = data.results
      this.quizService.setGeneratedQuiz(this.questions);
    })
  } 
 }
 ngOnDestroy(): void {
   this.quizSubscription?.unsubscribe();
 }
}

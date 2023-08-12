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
    
}

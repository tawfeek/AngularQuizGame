import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionsList: any = [];
  public questionsListMulti: Question[];
  public questionsCounter: number = 1;
  public arrayItemsCounter: number = 0;
  public currentQuestion: Question;
  public points: number = 0;
  timeForEachQuestion : number = 15;
  timeCounter = this.timeForEachQuestion;
  tmpQuestion: Question;
  public numberOfMultiQuestions: number = 0;
  correctAnswers : number = 0;
  inCorrectAnswers : number = 0;
  interval$:any;


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.questionsCounter = 0;
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionsListMulti = [];
    this.numberOfMultiQuestions = 0;

    this.questionService.getQuestions()
      .subscribe(res => {
        res.results.forEach(item => {
          if (item.type == "multiple") {
            this.tmpQuestion = new Question(item.category, item.type, item.difficulty,
              item.question, item.correct_answer, item.incorrect_answers);
            this.questionsListMulti.push(this.tmpQuestion);
            this.numberOfMultiQuestions++;
          }
        })
        this.nextQuestion();
      });
  }

  nextQuestion() {
    this.currentQuestion = this.questionsListMulti[this.questionsCounter];
    //this.currentQuestion.answersToDisplay();
    this.questionsCounter++;
  }

  checkAncswer(answer){
    if(answer == this.currentQuestion.correct_answer){
      this.points += 10;
      this.correctAnswers++;
      this.timeCounter = this.timeForEachQuestion;
      this.nextQuestion();
    }
    else
    {
      this.inCorrectAnswers++;
      this.nextQuestion();
    }
  }

  startWatch(){
    this.interval$ = interval(1000)
    .subscribe(value => {
      this.timeCounter --;
      if(this.timeCounter == 0){
        this.nextQuestion();
      }
    });
    setTimeout(()=> {
      this.interval$.unsubscribe();
    }, 600000);

  }

  stopWatch(){
    this.interval$.unsubscribe();
    this.timeCounter = 0;
  }

  resetWatch(){
    this.startWatch();
    this.timeCounter = this.timeForEachQuestion;
    this.startWatch();
  }

}

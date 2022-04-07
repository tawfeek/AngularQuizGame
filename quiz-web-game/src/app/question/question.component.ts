import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public questionsCounter: number = 0;
  public currentQuestion: Question;
  public points: number = 0;
  timeForEachQuestion: number = 60;
  timeCounter = this.timeForEachQuestion;
  tmpQuestion: Question;
  public numberOfMultiQuestions: number = 0;
  correctAnswers: number = 0;
  inCorrectAnswers: number = 0;
  interval$: any;
  progress: string = "0";
  numberOfQuestionToDisplay: number = 5;
  isQuizCompleted: Boolean = false;


  constructor(private questionService: QuestionService, private route: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.questionsCounter = 0;
    this.getAllQuestions();
    this.startWatch();
  }

  getAllQuestions() {
    this.questionsListMulti = [];
    this.numberOfMultiQuestions = 0;

    this.questionService.getQuestions()
      .subscribe(res => {
        res.results.forEach(item => {
          // if (item.type == "multiple") {
          this.tmpQuestion = new Question(item.category, item.type, item.difficulty,
            item.question, item.correct_answer, item.incorrect_answers);
          this.questionsListMulti.push(this.tmpQuestion);
          this.numberOfMultiQuestions++;
          // }
        })
        this.nextQuestion();
      });
  }

  nextQuestion() {

    if (this.questionsCounter == (this.numberOfQuestionToDisplay - 1)) {
        this.isQuizCompleted = true;
        this.stopWatch();
    
    }
    else {
      setTimeout(() => {
        this.currentQuestion = this.questionsListMulti[this.questionsCounter];
        this.questionsCounter++;
        this.getProgressPercentage();
      }, 500);
    }

  }

  checkAncswer(answer) {
    if (answer == this.currentQuestion.correct_answer) {
      this.points += 10;
      this.correctAnswers++;
      this.timeCounter = this.timeForEachQuestion;
      this.nextQuestion();
      return true;
    }
    else {
      this.inCorrectAnswers++;
      this.nextQuestion();
      return false;
    }
  }

  changeColorOfTheClickedAnswerAccordingly(answer) {
    return answer == this.currentQuestion.correct_answer
  }

  startWatch() {
    this.interval$ = interval(1000)
      .subscribe(value => {
        this.timeCounter--;
        if (this.timeCounter == 0) {
          this.nextQuestion();
          this.timeCounter = this.timeForEachQuestion;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);

  }

  stopWatch() {
    this.interval$.unsubscribe();
    this.timeCounter = 0;
  }

  resetWatch() {
    this.isQuizCompleted = false;
    this.startWatch();
    this.timeCounter = this.timeForEachQuestion;
    this.startWatch();
  }

  resetQuiz() {
    this.resetWatch();
    this.getAllQuestions();
    this.questionsCounter = 0;
    this.correctAnswers = 0;
    this.inCorrectAnswers = 0;
    this.progress = "0";
  }

  getProgressPercentage() {
    this.progress = ((this.questionsCounter / this.numberOfQuestionToDisplay) * 100).toString();
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(){
   // return this.http.get<any>("assets/questions.json");
    return this.http.get<any>("https://opentdb.com/api.php?amount=100");
  }
}

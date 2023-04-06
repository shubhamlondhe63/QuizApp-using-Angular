import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questionslist: any =[];
  public name: string="";
  public currentquestion : number = 0;
  public points : number = 0;
  currectAnswer: number = 0;
  incorrectAnswer : number = 0;
  counter= 60; 
  interval$:any;
  constructor( private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startcounter(); 
  }

  getAllQuestions(){
    this.questionService.getQuestionsjson().subscribe(res =>{
      this.questionslist = res.questions
    }) 
  }


  nextQuestion(){
    this.currentquestion++
    console.log(this.currentquestion)
    this.counter= 60;
  }


  previousQuestion(){
    this.currentquestion--;
  }


  answer(currentQno:number, option:any){
    if(option.correct || this.currentquestion <  8)  {
      this.points += 10;
      this.currectAnswer++;
      this.currentquestion++;
    } else{
      this.points -= 10;
      this.currentquestion++;
      this.incorrectAnswer++;

    }
  }


  startcounter(){
    this.interval$ = interval(1000)
    .subscribe(val =>{
      this.counter--;
      if(this.counter ==0){
        this.counter = 60;
        this.currentquestion ++;
        this.points -= 10;
      }
    })

    setTimeout(()=>{
      this.interval$.unsubscribe();
    } , 600000);

  }
  stopcounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  
  resetcounter(){
    this.stopcounter();
    this.counter = 60;
    this.startcounter();

  }

  resetQuiz(){
    this.resetcounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter= 60;
    this.currentquestion =0;
  }
}

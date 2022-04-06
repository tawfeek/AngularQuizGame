import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('name') name!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  start(){
    localStorage.setItem('name', this.name.nativeElement.value);
    
  }

}

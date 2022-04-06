import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeAnswerColor]'
})
export class ChangeAnswerColorDirective {

  @Input() isAnswerCorrect : Boolean = false;
  constructor(private elementRef : ElementRef, private render : Renderer2) { }
  @HostListener('click') answer(){
    if(this.isAnswerCorrect){
      this.render.setStyle(this.elementRef.nativeElement, 'background', 'green');
      this.render.setStyle(this.elementRef.nativeElement, 'color', '#fff');
      this.render.setStyle(this.elementRef.nativeElement, 'border', '2px solid grey');
    }
    else{
      this.render.setStyle(this.elementRef.nativeElement, 'background', 'red');
      this.render.setStyle(this.elementRef.nativeElement, 'color', '#fff');
      this.render.setStyle(this.elementRef.nativeElement, 'border', '2px solid grey');
      
    }
  }

}

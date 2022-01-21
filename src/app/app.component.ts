import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  score = 0;
  transformVal = '';
  timer = 10;

  private screenSize = {
    x:0,
    y:0
  };

  private gameInProgress = false;

  @ViewChild('gameBody') gameBody : ElementRef | undefined;

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      if(this.gameInProgress) {
      if(this.timer > 0){
        this.timer--;
      }
      else{
        this.targetMissed();
      }
    }
    });
    }

  ngAfterViewInit(): void {
    this.screenSize.x = this.gameBody?.nativeElement.clientWidth;
    this.screenSize.y = this.gameBody?.nativeElement.clientHeight; 
    setTimeout(() => {
      this.generateRandomness();
    });
  }

  targetClicked(event: MouseEvent){
    this.score++;
    this.generateRandomness();
    this.gameInProgress = true;
    event.stopPropagation();
    
  }


  targetMissed(){
    alert('Game over, Your score was ' + this.score);
    this.gameInProgress = false;
    this.score = 0;
  }

  private generateRandomness(){
    this.transformVal = this.generateRandomTranslate() + 
                ' ' + 
                this.generateRandomScale();
  }

  private generateRandomScale(){
    let randomScaleVal = Math.random();
    randomScaleVal = randomScaleVal < 0.2 ? 0.2 : randomScaleVal;
    return `scale(${randomScaleVal})`;
  }

  private generateRandomTranslate(){
    let xVal = Math.random() * this.screenSize.x - 300;
    xVal = xVal < 300 ? 300 : xVal;
    let yVal = Math.random() * this.screenSize.y -300;
    yVal = yVal < 300 ? 300 : yVal;
    return `translate(${xVal}px, ${yVal}px)`;
  }
}

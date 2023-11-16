import { Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ImageContainerComponent } from './imagecontainer/imagecontainer.component';
import { GameService } from './Services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, KeyboardComponent, ImageContainerComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hangman';
  @ViewChild(KeyboardComponent) keyboard!: KeyboardComponent;
  @HostListener('document:keydown', ['$event'])
  KeyBoardPressed(event: KeyboardEvent): void {
    this.hangManService?.KeyBoardPressed(event);
  }

  constructor(public hangManService: GameService) {
  }

  ngAfterViewInit() {
    this.hangManService.keyboard = this.keyboard;
  }


}

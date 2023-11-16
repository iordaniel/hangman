import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})
export class KeyboardComponent {
  @Output() KeyPressed = new EventEmitter<string>();
  letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  keysPressed: string[] = [];
  audioKeySuccess: HTMLAudioElement = null!;
  audioKeyError: HTMLAudioElement = null!;

  constructor() { this.resetKeyboard(); }

  playSuccessSound() {
    this.audioKeySuccess ??= new Audio('../../sounds/correct.wav');
    this.audioKeySuccess.play();
  }
  playErrorSound() {
    this.audioKeyError ??= new Audio('../../sounds/error.mp3');
    this.audioKeyError.play();
  }

  keyPress(key: string) {
    this.keysPressed.push(key);
    this.KeyPressed.emit(key);
  }

  isPressed(key: string): boolean {
    return this.keysPressed.includes(key);
  }

  resetKeyboard() {
    this.keysPressed = [];
  }

}

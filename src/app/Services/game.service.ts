import { Injectable } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { Difficulty } from '../classes/public.types';

@Injectable({
  providedIn: 'root'
})

export class GameService {
  public keyboard!: KeyboardComponent;
  word: string[] = [];
  guessedKeys: string[] = [];
  nrOfErrors: number = 0;
  isGameRunning: boolean = false;
  youWon: boolean = false;
  useKeyboardSound: boolean = true;
  difficulty = Difficulty.Medium;
  nrOfTryes: number = 6;

  wordsEasy: string[] = [
    'floare', 'soare', 'vultur', 'paine', 'munte', 'lac', 'pui', 'casa', 'val', 'livada',
    'stalp', 'verde', 'bat', 'mare', 'frunza', 'siret', 'oras', 'vant', 'sofer', 'prima',
    'capra', 'luna', 'cal', 'pasare', 'pescar', 'potcovar', 'zbor', 'albastru', 'rosu', 'carbune',
    'zambila', 'biscuit', 'nuc', 'capitan', 'gheata', 'pian', 'vestitor', 'stire', 'tarta', 'blat'];


  wordsMedium: string[] = [
    'telefon', 'calculator', 'ciocolata', 'vapor', 'fotografie', 'scooter', 'instrument', 'portocala', 'cascaval', 'brosa',
    'aeroport', 'montaj', 'sculptura', 'lampadar', 'energie', 'scara', 'program', 'grafic', 'rasarit', 'revolver',
    'magazin', 'bancnota', 'camion', 'pianist', 'umbrela', 'desen', 'perete', 'violonist', 'matura', 'compozitor',
    'detectiv', 'animatie', 'aparat', 'barca', 'bulevard', 'galerie', 'circuit', 'arhitect', 'binoclu', 'sirag'];

  wordsHard: string[] = [
    'ornitorinc', 'quasar', 'xylofon', 'whisky', 'judoka', 'xerox', 'gazon', 'hazard', 'jocose', 'kamikaze',
    'quiche', 'clovn', 'mnemonic', 'blazer', 'cryptic', 'lyceum', 'gigabyte', 'jubilant', 'kaleidoscop', 'labyrinth',
    'quixotic', 'sphinx', 'xylograph', 'zephyr', 'juxtapose', 'bezique', 'czar', 'fjord', 'khaki', 'jazz',
    'muzhik', 'quandary', 'razzmatazz', 'schizophrenia', 'trapezoid', 'vex', 'waltz', 'zeppelin', 'bazaar', 'buzzard'];

  constructor() {
    this.initNewGame();
  }

  initNewGame() {
    let words: string[] = [];
    switch (this.difficulty) {
      case Difficulty.Easy:
        words = this.wordsEasy;
        break;
      case Difficulty.Medium:
        words = this.wordsMedium;
        break;
      case Difficulty.Hard:
        words = this.wordsHard;
        break;
      default:
        words = this.wordsEasy;
        break;
    }

    let index = Math.floor(Math.random() * words.length);
    this.word = words[index].toUpperCase().split("");
    this.guessedKeys = [];
    this.nrOfErrors = 0;
    this.youWon = false;
    this.isGameRunning = true;
    this.keyboard?.resetKeyboard();
  }

  showLetter(letter: string): boolean {
    return this.guessedKeys.includes(letter);
  }

  KeyBoardPressed(event: KeyboardEvent) {
    let key = event.key.toUpperCase();
    if (key >= 'A' && key <= 'Z')
      if (this.isGameRunning) {
        this.keyboard?.keyPress(key);
        if (this.useKeyboardSound && this.word.includes(key)) {
          this.keyboard.playSuccessSound();
        }
      }
  }

  onKeyPressed(event: any) {
    if (!this.word.includes(event)) {
      this.nrOfErrors++;
      if (this.useKeyboardSound && this.guessedKeys.length <= this.word.length) {
        this.keyboard?.playErrorSound();
      }
      if (this.nrOfErrors == this.nrOfTryes) {
        setTimeout(() => {
          this.isGameRunning = false;
          this.youWon = false;
        }, 100);
      }
    }
    else {
      this.word.forEach((letter, index) => {
        if (letter == event) {
          this.guessedKeys.push(event);
        }
      });
      if (this.useKeyboardSound && (this.word.includes(event) && this.guessedKeys.length <= this.word.length)) {
        this.keyboard?.playSuccessSound();
      }
      if (this.word.length == this.guessedKeys.length) {
        setTimeout(() => {
          this.isGameRunning = false;
          this.youWon = true;
        }, 100);
      }
    }
  }
}

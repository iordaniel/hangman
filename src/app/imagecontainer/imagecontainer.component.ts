import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imagecontainer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagecontainer.component.html',
  styleUrl: './imagecontainer.component.scss'
})
export class ImageContainerComponent {

  @Input() Index:number=0;
  constructor() { }
}

import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-erreur',
  templateUrl: './erreur.component.html',
  styleUrls: ['./erreur.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('imageZoomInOut', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('500ms', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class ErreurComponent {

}

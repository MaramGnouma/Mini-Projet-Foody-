// star-rating.directive.ts
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appStarRating]'
})
export class StarRatingDirective implements OnInit {
  @Input() appStarRating!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.updateStars();
  }

  private updateStars(): void {
    // Clear existing stars
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', '');

    // Add new stars based on the numeric value
    for (let i = 0; i < this.appStarRating; i++) {
      const starIcon = this.renderer.createElement('span');
      this.renderer.addClass(starIcon, 'star-icon');
      this.renderer.appendChild(starIcon, this.renderer.createText('★'));
      this.renderer.appendChild(this.el.nativeElement, starIcon);
    }

    // Add half-star if needed
    if (this.appStarRating % 1 !== 0) {
      const halfStarIcon = this.renderer.createElement('span');
      this.renderer.addClass(halfStarIcon, 'star-icon');
      this.renderer.appendChild(halfStarIcon, this.renderer.createText('☆'));
      this.renderer.appendChild(this.el.nativeElement, halfStarIcon);
    }
  }
}

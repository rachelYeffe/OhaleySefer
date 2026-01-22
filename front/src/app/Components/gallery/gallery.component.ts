import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [NgFor],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
images: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ,13, 14, 15];

}

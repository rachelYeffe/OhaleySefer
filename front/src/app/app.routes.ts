import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { ContactComponent } from './Components/contact/contact.component';
import { ExperiencesComponent } from './Components/experiences/experiences.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'about', component: AboutComponent },
    {path: 'gallery', component: GalleryComponent },
    {path: 'contact', component: ContactComponent },
    {path: 'experiences', component: ExperiencesComponent },
];

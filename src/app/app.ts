import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from '../components/about/about';
import { Services } from '../components/services/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, About, Services],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('angular-app-new');

  date = new Date();

  imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHfD9JWXBHo5Pn2VrDXQwfBl_aWgd7q-0iTA&s";

  handleClickEvent(){
    alert("Clicked");
  }
}

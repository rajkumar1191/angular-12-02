import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { About } from '../components/about/about';
import { Services } from '../components/services/services';
import { LifecycleDemo } from '../components/lifecycle-demo/lifecycle-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, About, Services, LifecycleDemo, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-app-new');

  date = new Date();

  imgSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHfD9JWXBHo5Pn2VrDXQwfBl_aWgd7q-0iTA&s';

  // Lifecycle Demo Controls
  showLifecycle: boolean = true;
  lifecycleData: string = 'Initial Data';

  handleClickEvent() {
    alert('Clicked');
  }

  toggleLifecycle() {
    this.showLifecycle = !this.showLifecycle;
  }

  updateLifecycleData() {
    this.lifecycleData = 'Updated at ' + new Date().toLocaleTimeString();
  }

  resetData(event: string) {
    this.lifecycleData = event;
  }
}

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { About } from '../components/about/about';
import { Services } from '../components/services/services';
import { LifecycleDemo } from '../components/lifecycle-demo/lifecycle-demo';
import { AppHighlight } from './app-highlight';
import { ReversePipe } from './reverse-pipe';
import { FormsTutorial } from '../components/forms-tutorial/forms-tutorial';
// import { ServicesTutorial } from '../components/services-tutorial/services-tutorial';
// import { SignalsTutorial } from '../components/signals-tutorial/signals-tutorial';
// import { RoutingTutorial } from '../components/routing-tutorial/routing-tutorial';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    About,
    Services,
    LifecycleDemo,
    FormsTutorial,
    // ServicesTutorial,
    // SignalsTutorial,
    // RoutingTutorial,
    CommonModule,
    AppHighlight,
    ReversePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular app new');

  course = [
    { name: 'Angular', duration: '4 weeks' },
    { name: 'React', duration: '3 weeks' },
    { name: 'Vue', duration: '2 weeks' },
  ];

  date = new Date();

  jsonData = {
    name: 'Angular',
    version: '12',
    features: ['Components', 'Directives', 'Pipes', 'Services'],
  };

  imgSrc =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHfD9JWXBHo5Pn2VrDXQwfBl_aWgd7q-0iTA&s';

  // Lifecycle Demo Controls
  showLifecycle: boolean = true;
  lifecycleData: string = 'Initial Data';

  themeColor = 'cyan';

  fontSize = 35;

  price = 100.25;
  percentValue = 0.25;

  name: any = 'Angular';

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

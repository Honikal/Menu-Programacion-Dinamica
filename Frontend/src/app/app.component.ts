import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabComponentComponent } from './tab-component/tab-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TabComponentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}

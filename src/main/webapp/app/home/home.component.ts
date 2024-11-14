import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  environment = environment;

  firstName: string | null = '';
    surname: string | null = '';

    ngOnInit() {
      this.firstName = localStorage.getItem('firstName');
      this.surname = localStorage.getItem('surname');
    }

}

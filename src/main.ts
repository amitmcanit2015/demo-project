import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UserTableComponent } from './app/components/user-table/user-table.component';
import { UserDetailsComponent } from './app/components/user-details/user-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main class="min-h-screen bg-gray-50">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {}

const routes = [
  { path: '', component: UserTableComponent },
  { path: 'details/:id', component: UserDetailsComponent }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(err => console.error(err));
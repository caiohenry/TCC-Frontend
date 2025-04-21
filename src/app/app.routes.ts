import { Routes } from '@angular/router';
import { NavigationPageComponent } from './pages/navigation-page/navigation-page.component';


export const routes: Routes = [
    {
        path: '',
        title: 'Início',
        loadComponent: () =>
            import(
              './pages/navigation-page/navigation-page.component'
            ).then((m) => m.NavigationPageComponent),
        
    },
    {path: '**', redirectTo: '', pathMatch: 'full' }
    
];


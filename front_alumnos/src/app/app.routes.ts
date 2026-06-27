import { Routes } from '@angular/router';
import { AlumnoComponent } from './feactures/alumno.component/alumno.component';


export const routes: Routes = [
  {
    path: '',
    component: AlumnoComponent,
  },
  {
    path: 'alumnos',
    component: AlumnoComponent,
  },

];
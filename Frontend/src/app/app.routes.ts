import { Routes } from '@angular/router';
import { Proyecto00IoComponent } from './proyecto00-io/proyecto00-io.component';
import { Proyecto01IoComponent } from './proyecto01-io/proyecto01-io.component';

export const routes: Routes = [
    //Crearemos acá todas las rutas por las cuales el programa puede navegar
    { path: '',             component: Proyecto00IoComponent},
    { path: 'rutas-cortas', component: Proyecto01IoComponent}
];

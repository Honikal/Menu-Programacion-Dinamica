import { Routes } from '@angular/router';
import { Proyecto00IoComponent } from './proyecto00-io/proyecto00-io.component';
import { Proyecto01IoComponent } from './proyecto01-io/proyecto01-io.component';
import { Proyecto02IoComponent } from './proyecto02-io/proyecto02-io.component';
import { Proyecto03IoComponent } from './proyecto03-io/proyecto03-io.component';
import { Proyecto04IoComponent } from './proyecto04-io/proyecto04-io.component';

export const routes: Routes = [
    //Crearemos acá todas las rutas por las cuales el programa puede navegar
    { path: '',                    component: Proyecto00IoComponent},
    { path: 'rutas-cortas',        component: Proyecto01IoComponent},
    { path: 'mochila',             component: Proyecto02IoComponent},
    { path: 'series-deportivas',   component: Proyecto03IoComponent},
    { path: 'arboles-optimizados', component: Proyecto04IoComponent}
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-proyecto04-io',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto04-io.component.html',
  styleUrl: './proyecto04-io.component.css'
})
export class Proyecto04IoComponent {
  keyCount = 1;

  /*Ésta función se encarga de tomar la cantidad de nodos y con base a éstos, generará el sistema de 
  nodos acomodado, que luego determinaremos para conexiones*/
  generate(){
    console.log('Cantidad de nodos: ', this.keyCount);
  }
}

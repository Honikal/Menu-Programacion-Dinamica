import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
 

@Component({
  selector: 'app-proyecto01-io',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto01-io.component.html',
  styleUrl: './proyecto01-io.component.css'
})
export class Proyecto01IoComponent {
  nodeCount: number = 1;

  //Reducimos el valor de nodos en las rutas posibles
  decreaseValue() {
    if (this.nodeCount > 1){
      this.nodeCount--;
    }
  }

  increaseValue(){
    if (this.nodeCount < 10){
      this.nodeCount++;
    }
  }

  //Desactivamos el scroll como tal
  disableScroll(event: WheelEvent){
    event.preventDefault();
  }

  /*Ésta función se encarga de tomar la cantidad de nodos y con base a éstos, generará el sistema de 
  nodos acomodado, que luego determinaremos para conexiones*/
  generate(){
    console.log('Cantidad de nodos: ', this.nodeCount);
  }
}

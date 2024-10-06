import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-proyecto02-io',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto02-io.component.html',
  styleUrl: './proyecto02-io.component.css'
})
export class Proyecto02IoComponent {
  bagSize = 1;  //Tamaño de mochila entre 1 a 20
  objCount = 1; //Cantidad de objetos entre 1 a 10

  showObjectSection = false;
  showHelpText = false;

  mode = 0; //Index de modo como tal, 0 siendo el valor de bounded, y 1 siendo el valor de unbounded 

  /*Ésta función se encarga de tomar la cantidad de nodos y con base a éstos, generará el sistema de 
  nodos acomodado, que luego determinaremos para conexiones*/
  generate(){
    console.log('Máxima capacidad de mochila: ', this.bagSize);
    console.log('Máxima cantidad de objetos: ' , this.objCount);
    this.showObjectSection = true;
  }

  /*Función del botón con signo de pregunta que explica el uso de cada modo*/
  toggleHelp(){
    this.showHelpText = !this.showHelpText;
  }


}

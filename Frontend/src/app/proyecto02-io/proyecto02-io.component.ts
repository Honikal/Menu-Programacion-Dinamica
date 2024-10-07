import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Mochila, KnapsackItem, mathAnswer } from '../../../../Backend/src/dynamic-programming/mochila'


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
  showResults = false;
  showModalButton = false;

  mode = '1/0'; //Valor inicial para modo ('1/0', 'bounded', y 'unbounded')
  //Index de modo como tal, 0 siendo el valor de bounded, y 1 siendo el valor de unbounded 

  //Array de objetos encargado de guardar los datos de los objetos de la mochila
  objects: KnapsackItem[] = [];
  objects_names: string[] = [];

  tabla: number[][] = [];   //Tabla a mostrar
  equation: mathAnswer = { Z: 0, lista_variables: [], equation: '', restriccion: '', restricciones: []};


  //Función encargada de generar los botones según el número específico
  generateObjects(){
    this.objects = [];
    for (let i = 0; i < this.objCount; i++) {
      this.objects.push({
        'name': '',
        'value': 1,
        'size': 1,
        'amount': 1
      });
    }
  }

  /*Ésta función se encarga de tomar la cantidad de nodos y con base a éstos, generará el sistema de 
  nodos acomodado, que luego determinaremos para conexiones*/
  generate(){
    console.log('Máxima capacidad de mochila: ', this.bagSize);
    console.log('Máxima cantidad de objetos: ' , this.objCount);
    this.showObjectSection = true;
    this.generateObjects();
  }

  //Modo para actualizar los datos visualizados
  updateMode(){
    this.objects.forEach((object) => {
      if (this.mode === '1/0'){
        object.amount = 1;
      } else if (this.mode === 'unbounded'){
        object.amount = Infinity;
      }
    })
  }

  //Función encargada de hacer el método de mochila
  validateAndGenerate(){
    //Primero, verificamos que todos los campos estén completos
    let isValid = true;

    //Limpiamos por si acaso la lista de nombres
    this.objects_names = [];

    for (let object of this.objects){
      if (!object.name ||
        !Number.isInteger(object.value) ||
        !Number.isInteger(object.size)
      ){
        isValid = false;
        break;
      }

      //Guardamos los nombres de objetos usados
      this.objects_names.push(object.name);
    }

    if (!isValid){
      alert('Por favor, complete todos los campos válidos enteros');
      this.objects_names = [];
      return;
    }

    /*Mostramos como prueba todos los valores de cada objeto para comprobar, pero técnicamente
    acá llamamos la función como tal*/
    this.objects.forEach((object, index) => {
      console.log(`Objeto ${index + 1}: Nombre=${object.name}, Valor=${object.value}, Peso=${object.size}, Cantidad=${object.amount}`);
    });

    //Calculamos el knapsack
    let resultado;
    if (this.mode === '1/0'){
      resultado = Mochila.knapsack_io(this.bagSize, this.objects);
    } else if (this.mode === 'bounded'){
      resultado = Mochila.knapsack_bounded(this.bagSize, this.objects);
    } else {
      resultado = Mochila.knapsack_unbounded(this.bagSize, this.objects);
    }

    this.tabla = resultado.filteredDp;
    this.equation = Mochila.get_math_answer(resultado.selectedItems, this.objects, this.bagSize);


    //Mostramos el modal con la respuesta
    this.showResults = true;
    this.showModalButton = true;
  }

  openModal() {
    this.showResults = true;
  }

  closeModal() {
    this.showResults = false;
  }

}

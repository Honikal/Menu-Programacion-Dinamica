import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { nodeItem, TreeNode, optimal_binary_search_tree } from '../../../../Backend/src/dynamic-programming/binary-search-tree'
import { TreeVisualizerComponent } from 'app/tree-visualizer/tree-visualizer.component';



@Component({
  selector: 'app-proyecto04-io',
  standalone: true,
  imports: [CommonModule, FormsModule, TreeVisualizerComponent],
  templateUrl: './proyecto04-io.component.html',
  styleUrl: './proyecto04-io.component.css'
})
export class Proyecto04IoComponent {
  keyCount = 1;

  showKeysSection = false; //Flag para mostrar los demás datos una vez dado click a las llaves
  
  showResults = false; //Flag para mostrar las respuestas, o activar el modal que muestra dichas respuestas
  showModalButton = false; //Flag para mostrar el botón que activa el modal

  //Array de nodos
  nodos: nodeItem[] = [];

  tablaA: number[][] = []; //Tabla que almacena los valores de cada nodo, los puntos a importancia se encuentran en diagonal superior
  tablaR: number[][] = []; //Tabla que almacena el orden que tendría el árbol

  generatedTree: TreeNode | null = null;

  generateNodes(){
    this.nodos = [];
    for (let i = 0; i < this.keyCount; i++){
      this.nodos.push({
        name: '',
        value: 0
      })
    }
  }


  /*Ésta función se encarga de tomar la cantidad de nodos y con base a éstos, generará el sistema de 
  nodos acomodado, que luego determinaremos para conexiones*/
  generate(){
    console.log('Cantidad de nodos: ', this.keyCount);
    this.generateNodes(); //Generamos los nodos de forma automática
    this.showKeysSection = true;
  }

  //Función encargada de validar y generar el árbol
  validateAndGenerate(){
    /*El único tipo de validación que debemos de tomar en cuenta, es si la suma de todos los
    valores es igual a 1 como máximo*/
    let sumador = 0;
  
    for (let nodo of this.nodos){
      if (!nodo.name || !nodo.value){
        alert('Por favor, complete todos los campos');
        return;
      }

      sumador += nodo.value;
    }

    //Validamos que el valor de sumador sea igual a 1
    if (sumador !== 1){
      alert('La suma del valor de todos los nodos debe de dar 1, siempre debe ser el caso');
      return;
    }

    let resultado;
    //Llamamos a la función principal
    resultado = optimal_binary_search_tree.obst(this.nodos);
    this.tablaA = resultado.A;
    this.tablaR = resultado.R;
    this.nodos = resultado.sortedNodos;

    console.log("Tablas generadas: ", this.generatedTree);

    //Generamos, con los nodos obtenidos, el árbol
    this.generatedTree = optimal_binary_search_tree.generateTree(this.tablaR, this.nodos);

    console.log("Arbol generado, acá se muestra: ", this.generatedTree);

    //Una vez extraídos los valores como tal, los enviamos a mostrar
    this.showResults = true;
    this.showModalButton = true;
  }

  openModal() {
    this.showResults = true;
  }

  closeModal() {
    this.showResults = false;
  }

  /*Control de archivos, importación y exportacion*/
  exportToJson(){
    const data = {
      keyCount: this.keyCount,
      nodos: this.nodos,
      tablaA: this.tablaA,
      tablaR: this.tablaR,
      tree: this.generatedTree
    };

    //Primero, tomamos el dato, lo convertimos en un struct, y lo convertimos en JSON
    const dataStr = JSON.stringify(data);
    const blob = new Blob([dataStr], { type: 'application/json' });

    //Luego, identificamos el tipo de data, y empezamos a crear un url, el cual vamos a usar para descargar la prueba
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    //Una vez generado el archivo como tal, entonces nos disponemos a que se cree la descarga, y quitamos el valor de url
    a.href = url;
    a.download = 'Prueba de Árbol Binario Óptimo'
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importFromJson(event: Event){
    //Método para importar un JSON de nuestro tipo como una prueba
    const input = event.target as HTMLInputElement;
    if (!input.files?.length){
      //Checamos que hayan archivos los cuales podamos usar o extraer, sino detenemos el programa
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      /*Usamos la función del reader onload a nuestro favor, modificando su código para utilizar y extraer
      los datos a nuestra manera*/
      try {
        const data = JSON.parse(reader.result as string);

        //Seteamos los datos importados
        this.keyCount = data.keyCount;
        this.nodos = data.nodos;
        this.tablaA = data.tablaA;
        this.tablaR = data.tablaR;
        this.generatedTree = data.tree;

        alert("Datos importados correctamente");

        //Ya que importamos, lo mejor será que activemos de una los datos a mostrar la info
        this.showKeysSection = true;
        this.showModalButton = true;
        this.showResults = true;

      } catch (error) {
        alert('Error al leer el archivo JSON. Asegúrese que el formato sea el correcto');
      }
    }

    //Una vez modificado, hacemos la llamada de la función a llamar el archivo
    reader.readAsText(file);
  }
}

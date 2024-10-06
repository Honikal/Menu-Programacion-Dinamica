import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { SeriesDeportivas } from '../../../../Backend/src/dynamic-programming/series-deportivas'

@Component({
  selector: 'app-proyecto03-io',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proyecto03-io.component.html',
  styleUrl: './proyecto03-io.component.css'
})
export class Proyecto03IoComponent {
  gamesCount = 1;
  showGameSetup = false;
  gameLocations: string[] = [];
  ph = 50;
  pr = 50;
  qh = 50;
  qr = 50;

  generatedSeries : number[][] = [];

  //Comando para generar la distribución máxima, seteamos con ésto el array a usar para determinar los juegos
  generate(){
    console.log("Partidas por jugar: ", this.gamesCount);
    this.showGameSetup = true;
    //Ponemos todos los juegos como predeterminados del equipo A
    this.gameLocations = Array(this.gamesCount).fill(' ');
  }

  //Se encarga de determinar la ubicación de un juego determinado
  setGameLocation(index: number, team: 'A' | 'B'){
    //Se asegura de checar que la diferencia de juegos entre equipos A y B se mantenga balanceada
    const countA = this.gameLocations.filter(loc => loc === 'A').length;
    const countB = this.gameLocations.filter(loc => loc === 'B').length;

    //Desactivamos si ya está activado como tal
    if (this.gameLocations[index] === team){
      this.gameLocations[index] = ' ';
    }

    //Si pasa el chequeo como balance, entonces se modifica el valor del juego
    if (team === 'A' && countA < Math.ceil(this.gamesCount / 2)){
      this.gameLocations[index] = 'A';
    } else if (team === 'B' && countB < Math.ceil(this.gamesCount / 2)){
      this.gameLocations[index] = 'B';
    }
  }

  //Actualizar las probabilidades
  updateProbabilities(){
    this.qh = 100 - this.pr;
    this.qr = 100 - this.ph;
  }

  //Función encargada de generar la tabla de datos generados por programación dinámica
  validateAndGenerate(){
    //Validamos si los valores son enteros y si gameLocations está vacío
    if (this.gamesCount % 2 === 0 || this.gamesCount < 1){
      alert('La cantidad de partidas debe ser un número impar positivo');
      return;
    }

    //Checamos si el gameslocation tiene un valor vacío
    if (this.gameLocations.includes(' ')){
      alert('Por favor, completa la selección del orden de las partidas por jugar');
      return;
    }

    //Llamamos la función de series deportivas
    const resultado = new SeriesDeportivas()
    this.generatedSeries = resultado.series_deportivas(this.ph, this.pr, this.gameLocations);

    console.log('Matriz generada: ', this.generatedSeries);
  }


}

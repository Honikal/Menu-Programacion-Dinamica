import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-component.component.html',
  styleUrl: './tab-component.component.css'
})
export class TabComponentComponent {
  showSettingsMenu: boolean = false;
  isNightMode: boolean = false;

  //Instanciamos un constructor como tal
  constructor(private router: Router) {}

  toolTipText1 = `Éste algoritmo se encarga de definir de una cantidad de ciudades, y sus distancias entre sí, las rutas más cortas
  entre cada una. Puedes definir como tal la cantidad máxima de nodos o ciudades que deseas, definir una distancia
  establecida, o quitar una conexión de una ciudad a otra, una vez hayas hecho todo lo deseado, puedes presionar general
  y el sistema como tal generará las rutas más cortas posibles
  `;

  toolTipText2 = `Éste programa te permite usar el algoritmo de la mochila, eligiendo entre los 2 modos, das un máximo de peso o valor
  (entre 1 y 20), generar los objetos (entre 1 y 10), y por cada objeto generado se genera un costo, valor, nombre y
  cantidad disponible o en stock de ser necesarios (incluido el caso default que son infinitos o 0 dependiendo del modelo).
  Con base a ésto, presionas generar y recibirás una tabla con los distintos casos obtenidos, y el mejor caso posible
  `;

  toolTipText3 = `Se tiene un número máximo de juegos, siempre impar, desde 1 hasta 11, el usuario podrá seleccionar el número, con base a éste,
  se generan 2 equipos, equipo A y equipo B, el usuario podrá introducir 2 probabilidades, la probabilidad del equipo A en ganar
  en casa (p_h), probabilidad de ganar en visita (p_r), con base a ésto, las probabilidades del equipo B se automatizan (siendo q_h y q_r)
  respectivamente. Con base a ésto, se generará una tabla con las distintas probabilidades, y la probabilidad final como tal.
  `;

  toolTipText4 = `Se selecciona un número de llaves totales, siendo n <= 10, para cada llave generada hay un texto o código, y por cada
  llave se escribirá un peso expresado como número real (entero o decimal). Con base ésto, se planea que se genere y
  ordene el árbol de tal manera que se cumpla el algoritmo, y se muestre un árbol ordenado
  `;

  toolTipText5 = `No hace nada en realidad, no cierra la página como tal por ahora, pero iría a una página inicial o index en un futuro
  `;

  navigateTo(ruta: string){
    //Función encargada de la navegación por medio de las rutas seteadas inicialmente en el app.routes.ts
    this.router.navigate([ruta]);
  }

  toggleSettings(){
    this.showSettingsMenu = !this.showSettingsMenu;
  }
  toggleNightMode(event: any){
    this.isNightMode = event.target.checked;
    if (this.isNightMode){
      console.log("Modo oscuro");
      document.body.classList.add('night-mode');
    }else{
      console.log("Modo claro");
      document.body.classList.remove('night-mode');
    }
  }

  changeLanguage(event: any){
    
  }
}

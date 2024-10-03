import { Component, HostListener, OnInit } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carrucel-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrucel-imagenes.component.html',
  styleUrl: './carrucel-imagenes.component.css'
})
export class CarrucelImagenesComponent {
  images = [
    { 'url': '../../assets/image1.svg', 'altText': 'Imagen de ejemplo de caso de rutas cortas', 'feedback': ''},
    { 'url': '../../assets/image2.svg', 'altText': 'Imagen de ejemplo de caso de mochila', 'feedback': ''},
    { 'url': '../../assets/image3.svg', 'altText': 'Imagen de ejemplo de caso de series deportivas', 'feedback': ''},
    { 'url': '../../assets/image4.svg', 'altText': 'Imagen de ejemplo de caso de árboles binarios óptimos', 'feedback': ''}
  ];

  //Manejo del cambio de páginas
  showArrows = true;
  currentIndex = 0;
  intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(){
    if (isPlatformBrowser(this.platformId)){
      this.startAutoSlide();
    }
  }

  //Con ayuda del set interval gracias a Angular, podemos crear una animación automática que se mueva al pasar cierto tiempo
  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 15000);
  }

  //Hacemos una llamada para detener el movimiento automático
  stopAutoSlide() {
    if (this.intervalId){
      clearInterval(this.intervalId);
    }
  }

  //Definimos un método para determinar cual es el siguiente index
  nextSlide(){
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  //Definimos un método para determinar el index previo
  prevSlide(){
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  getTransform(){
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove() {
    this.showArrows = true;
    setTimeout(() => {
      this.showArrows = false;
    }, 5000) //Flechas desaparecen luego de 5 segundos de inactividad
  }
}

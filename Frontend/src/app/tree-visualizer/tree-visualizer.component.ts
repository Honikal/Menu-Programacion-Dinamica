import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { TreeNode } from '../../../../Backend/src/dynamic-programming/binary-search-tree'

import * as d3 from 'd3';

@Component({
  selector: 'app-tree-visualizer',
  standalone: true,
  imports: [],
  template: `<div id="tree"></div>`,
  styleUrl: './tree-visualizer.component.css'
})
export class TreeVisualizerComponent implements OnChanges {
  @Input() treeData: TreeNode | null = null;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges){
    if (changes['treeData'] && this.treeData){
      console.log('Tree Data Received: ', this.treeData);      
      this.createTree(this.treeData);
    } 
  }

  //Función encargada de convertir el árbol generado por la función en tipo D3
  convertToD3TreeFormat(node: TreeNode | null) : any{
    if (!node){
      return null;
    }
    return {
      name: node.name,
      children: [
        this.convertToD3TreeFormat(node.left),
        this.convertToD3TreeFormat(node.right)
      ].filter(child => child !== null)
    };
  }

  createTree(treeData: TreeNode){
    const data = this.convertToD3TreeFormat(treeData);

    console.log(data);

    //Limpiamos el contenido previo
    d3.select(this.el.nativeElement).select('#tree').html('');

    //Obtenemos la profundidad máxima del árbol
    const maxDepth = this.calculateMaxDepth(data); 

    //Creamos los atributos para mostrar el componente como tal (dimensiones)
    const margin = {top: 50, right: 90, bottom: 150, left: 90};
    const nodeHeight = 100; //Espacio entre nodos para que no haya overlapping
    
    //Ajustamos el margin top y la altura del nodo basados en la profundidad del árbol
    const adjustedNodeHeight = Math.max(100, nodeHeight + 50 * maxDepth);

    //Obtenemos la anchura basado en el ancho del contenedor
    const containerRect = this.el.nativeElement.querySelector('#tree').getBoundingClientRect();
    const containerWidth  = containerRect.width;

    //Definimos altura predeterminada para el contenedor
    const defaultHeight = 400;

    //const height = Math.max(defaultHeight, adjustedNodeHeight * maxDepth);
    const height = Math.max(defaultHeight, adjustedNodeHeight);
    const width  = containerWidth  - margin.left - margin.right;

    const svg = d3.select(this.el.nativeElement).select('#tree')
      .append('svg')
      .attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    //Tomamos la raíz del árbol
    const root = d3.hierarchy(data);

    //Ajustamos el Tree Layout size basado en la cantidad de nodos para mejor visibilidad
    const nodeCount = root.descendants().length;
    const adjustedHeight = Math.max(height, 50 * nodeCount);
    const adjustetWidth = Math.max(width, 50 * maxDepth)

    //Utilizamos el treeLayout que ya viene con d3, y lo mostramos
    const treeLayout = d3.tree().size([adjustetWidth, adjustedHeight]);
    treeLayout(root);

    //Ajustamos la posición para hijos únicos (moviéndolos ligeramente para evitar lineas rectas)
    root.descendants().forEach(d => {
      if (d.children && d.children.length === 1){
        //Movemos el hijo a la izquierda, o a la derecha
        const child = d.children[0];
        const isLeftChild = child.data.name < d.data.name;
        const offset = 50;
        const xOffset = isLeftChild ? -offset : offset;

        //Aplicamos el offset al hijo y lo propagamos a sus descendientes
        this.adjustSubtreeXPosition(child, xOffset);
      }
    })

    //Nos encargamos de generar todas las conexiones
    const link = svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => d.source.x ?? 0)
      .attr('y1', d => d.source.y ?? 0)
      .attr('x2', d => d.target.x ?? 0)
      .attr('y2', d => d.target.y ?? 0)
      .attr('stroke', '#FF6B6B');

    //Nos encargamos de modificar la parte gráfica de los nodos
    const node = svg.selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)

    //Nos encargamos de mostrar los nodos como círculos
    node.append('circle')
      .attr('r', Math.max(5, 50 - 2 * Math.log2(nodeCount))) //Ajustamos el radio del círculo basado en cantidad de nodos
      .attr('fill', '#FFE66D')

    node.append('text')
      .attr('dy', -10)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name);
  }

  //Se encarga de calcular el máximo de profundidad de los árboles
  calculateMaxDepth(node: any, depth: number = 0): number{
    if (!node || !node.children || node.children.length === 0) {
      return depth;
    }
    return Math.max(...node.children.map((child: any) => this.calculateMaxDepth(child, depth + 1)));
  }

  /**
    * Adjusts the X position of a subtree rooted at the given node.
    * @param node The root node of the subtree.
    * @param offset The offset to apply to the X position.
    */
  adjustSubtreeXPosition(node: d3.HierarchyNode<any>, offset: number) {
    console.log('Nodo name: ', node.data.name);
    console.log('Antes de moverse: ', node.x);

    if (node && typeof node.x != 'undefined'){
      node.x += offset;
    }

    console.log('Después de moverse: ', node.x);

    if (node.children){
      node.children.forEach(child => {
        this.adjustSubtreeXPosition(child, offset);
      });

    }
  }
  

}

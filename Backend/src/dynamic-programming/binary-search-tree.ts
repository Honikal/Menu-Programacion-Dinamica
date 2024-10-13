export interface nodeItem {
    name: string,
    value: number
}

export interface TreeNode{
    name: string,
    value: number,
    left: TreeNode | null,
    right: TreeNode | null
}

export class optimal_binary_search_tree {
    static obst(
        nodos: nodeItem[]
    ) : { A: number[][], R: number[][], sortedNodos: nodeItem[] } {
        const k = nodos.length; //Cantidad de llaves

        //Ordenamos los nodos basados en el nombre, de forma alfabética
        const sortedNodos = [...nodos].sort((a, b) => a.name.localeCompare(b.name))

        //Matrix de valor A
        const A: number[][] = Array.from(
            { length: k+1 }, () => Array(k+1).fill(Infinity)
        );

        //Matrix de valor R
        const R : number[][] = Array.from(
            { length: k+1 }, () => Array(k+1).fill(0)
        );

        //Casos triviales
        //Caso en que A[i][j] = 0
        for (let i = 0; i < k; i++){
            A[i][i] = 0;
            A[i][i+1] = sortedNodos[i].value;
            R[i][i+1] = i+1 
        }

        //Función principal
        for (let length = 2; length <= k; length++){
            for (let i = 0; i <= k - length; i++){
                const j = i + length;

                //Total probabilidad (sumatoria de llaves entre i y j)
                const total_prob = sortedNodos.slice(i, j).reduce((sum, nodo) => sum + nodo.value, 0);
                //Ésto es lo equivalente a Python sum(i:j)

                //Probamos con las posibles raíces del árbol
                for (let raiz = i; raiz < j; raiz++){
                    const cost = Math.round((A[i][raiz] + A[raiz+1][j] + total_prob) * 100) / 100;

                    if (cost < A[i][j]){
                        A[i][j] = cost;
                        R[i][j] = raiz + 1;  //Raíz actual como mejor candidato
                    }
                }
            }
        }

        //Nada más modificamos el último valor de la matrix A
        A[A.length - 1][A.length - 1] = 0;

        return { A, R, sortedNodos };
    }

    static buildTree(
        tablaR: number[][],
        sortedNodos: nodeItem[],
        start: number, 
        end: number
    ) : TreeNode | null {
        //Caso básico, si el valor mayor es más grande que el punto final, no existe un nodo
        if (start >= end){
            return null;
        }

        //Tomamos la raíz index del rango actual
        const rootIndex = tablaR[start][end] - 1; //Ajustamos para que esté en base 0

        //Creamos un nuevo árbol nodo usando la raíz seleccionada de sortedNodos
        const rootNodo : TreeNode = {
            name: sortedNodos[rootIndex].name,
            value: sortedNodos[rootIndex].value,
            left: null,
            right: null
        };

        //De forma recursiva, construimos árboles izquierdos y derechos
        //Subarbol izquierdo, desde el valor inicial hasta rootIndex - 1 
        rootNodo.left = this.buildTree(tablaR, sortedNodos, start, rootIndex);
        //Subarbol derecho, desde rootIndex - 1 hasta el valor final de la lista
        rootNodo.right = this.buildTree(tablaR, sortedNodos, rootIndex + 1, end);

        return rootNodo;
    }

    static generateTree(
        tablaR: number[][], 
        sortedNodos: nodeItem[]
    ): TreeNode | null{
        return this.buildTree(tablaR, sortedNodos, 0, sortedNodos.length)
    }
}


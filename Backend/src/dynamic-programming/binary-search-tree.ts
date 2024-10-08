export interface nodeItem {
    name: string,
    value: number
}


export class optimal_binary_search_tree {
    static obst(
        nodos: nodeItem[]
    ) : { A: number[][], R: number[][] } {
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

        return { A, R };
    }
}


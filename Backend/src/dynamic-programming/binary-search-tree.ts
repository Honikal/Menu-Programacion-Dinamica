export interface nodeItem {
    name: string,
    value: number
}


export class optimal_binary_search_tree {
    static obst(
        nodos: nodeItem[]
    ) : number[][] {
        const k = nodos.length; //Cantidad de llaves

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
            A[i][i+1] = nodos[i].value;
            R[i][i+1] = i+1 
        }

        //Función principal

        return A;
    }
}


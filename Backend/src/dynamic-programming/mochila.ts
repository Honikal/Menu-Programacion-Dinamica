export interface KnapsackItem {
    name: string;
    value: number;
    size: number;
    amount: number;
}

export interface mathAnswer {
    Z: number;
    lista_variables: number[];
    equation: string;
    restriccion: string;
    restricciones: string[];
}

export class Mochila {
    //Creamos los métodos de Mochila

    //Mochila 1/0
    static knapsack_io(
        bagSize: number,         //Tamaño máximo de la mochila
        objects: KnapsackItem[]  //Array de objetos, con nombre, costo, valor y cantidad disponible
    ) : { filteredDp: number[][], selectedItems: number[] }
    {
        const n = objects.length;

        //Inicializamos la tabla de programación dinámica de la mochila
        const dp: number[][] = Array.from(
            { length: n + 1 }, () => Array(bagSize + 1).fill(0)        
        );

        //Creamos la función para mostrar el problema resuelto en forma matemática
        /*Ésto lo cambiamos, al final es más práctico igual tener control de ésto con base
        a una tabla*/
        const selected: number[][] = Array.from(
            {length: n + 1}, () => Array(bagSize + 1).fill(0)
        );

        for (let i = 1; i <= n; i++){
            for (let w = 0; w <= bagSize; w++){
                const { value, size } = objects[i - 1];
                if (size <= w){
                    /*Si se refleja cambio, si encontramos un nuevo máximo, por lo tanto podemos usar un nuevo valor
                    en la tabla e indicar en la tabla de valores que si usamos la variable*/
                    if (dp[i - 1][w - size] + value > dp[i - 1][w]){
                        dp[i][w] = dp[i - 1][w - size] + value
                        selected[i][w] = 1;
                    } else {
                        dp[i][w] = dp[i - 1][w];
                    }
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        /* Backtracking extra para control de valores */
        const selectedItems = selected.map(row => row[bagSize]).slice(1);
        
        //Retornamos todo al final        
        const filteredDp = this.transposeTable(dp.slice(1));
        return { filteredDp, selectedItems };
    }

    //Mochila Bounded
    static knapsack_bounded(
        bagSize: number,         //Tamaño máximo de la mochila
        objects: KnapsackItem[]  //Array de objetos, con nombre, costo, valor y cantidad disponible
    ) : { filteredDp: number[][], selectedItems: number[] } {
        const n = objects.length;

        //Inicializamos la tabla de programación dinámica de la mochila
        const dp: number[][] = Array.from(
            { length: n + 1 }, () => Array(bagSize + 1).fill(0)        
        );

        /*Creamos una tabla de valores como tal de variables usadas*/
        //Usaremos una tabla "3D" para alcanzar el punto deseado
        const selectedCount: number[][][] = Array.from(
            {length: n + 1}, () => 
                Array.from(
                    { length: bagSize + 1 }, () => 
                        Array(n).fill(0)
                )
        );

        for (let i = 1; i <= n; i++){
            const { value, size, amount } = objects[i - 1];
            for (let w = 0; w <= bagSize; w++){
                //No usamos el item
                dp[i][w] = dp[i - 1][w];

                //Copiamos la selección previa
                for (let j = 0; j < n; j ++){
                    selectedCount[i][w][j] = selectedCount[i - 1][w][j];
                }

                //Iteramos sobre cuántas veces podemos usar el item (de 0 a amount)
                for (let k = 1; k <= amount; k++){
                    /*Checamos si la cantidad de amount que tenemos por el size es menor al peso, ésto lo usamos
                    para confirmar la cantidad máxima de elementos que podemos usar*/
                    if (k * size <= w){
                        //Calculamos el valor obtenido
                        /*Nos colocamos en la posición actual, y luego tomamos el peso - el resultado de la multiplicación, el
                        resultado del peso será la ubicación en la que podremos hacer el cambio, a eso le sumamos el valor
                        multiplicado con la cantidad del objeto */

                        const valorActual = dp[i - 1][w - k * size] + k * value;
                        if (valorActual > dp[i][w]){
                            dp[i][w] = valorActual;

                            //Actualizamos la cantidad seleccionada de objetos
                            for (let j = 0; j < n; j++){
                                selectedCount[i][w][j] = selectedCount[i-1][w-k*size][j];
                            }

                            //Registramos cuántas veces usamos el objeto actual
                            selectedCount[i][w][i-1] += k;
                        }
                    }
                }
            }
        }

        /* Luego de hacer ésto, retomamos los valores extraídos y los recuperamos */
        const selectedItems: number[] = selectedCount[n][bagSize]

        //Retornamos todo al final        
        const filteredDp = this.transposeTable(dp.slice(1));
        return { filteredDp, selectedItems };
    }

    //Mochila Unbounded
    static knapsack_unbounded(
        bagSize: number,         //Tamaño máximo de la mochila
        objects: KnapsackItem[]  //Array de objetos, con nombre, costo, valor y cantidad disponible
    ): { filteredDp: number[][], selectedItems: number[] } {
        const n = objects.length;

        //Inicializamos la tabla de programación dinámica de la mochila
        const dp: number[][] = Array.from(
            { length: n + 1 }, () => Array(bagSize + 1).fill(0)        
        );

        //Usaremos una tabla "3D" para alcanzar el punto deseado
        const selectedCount: number[][][] = Array.from(
            {length: n + 1}, () => 
                Array.from(
                    { length: bagSize + 1 }, () => 
                        Array(n).fill(0)
                )
        );

        /*Ésta vez intentaremos beneficiarnos del método, ya que es de forma infinita, solo requeririemos usar
        el valor y peso*/
        for (let i = 1; i <= n; i++){
            const { value, size } = objects[i - 1];

            for (let w = 0; w <= bagSize; w++){
                //Opción 1, no tomar el valor actual
                dp[i][w] = dp[i-1][w]
                selectedCount[i][w] = [...selectedCount[i - 1][w]];

                //Opción 2, tomar la cantidad necesaria de cada valor
                if (size <= w){
                    const newValue = dp[i][w - size] + value;

                    if (newValue > dp[i][w]) {
                        dp[i][w] = newValue;
                        selectedCount[i][w] = [...selectedCount[i][w - size]];
                        selectedCount[i][w][i - 1]++;
                    } 
                }
            }
        }

        const selectedItems: number[] = selectedCount[n][bagSize]
        
        //Retornamos todo al final        
        const filteredDp = this.transposeTable(dp.slice(1));
        return { filteredDp, selectedItems };
    }

    //Método para hacer el ejercicio matemático
    static get_math_answer(
        selected_items: number[], //Array de variables
        objects: KnapsackItem[],   //Array de objetos, con nombre, costo, valor y cantidad disponible
        bagSize: number
    ) : mathAnswer {
        let Z = 0;                          //Valor sumatoria que contiene la maximización de valores deseados
        let equation = 'Max Z = ';          //Operación matemática visual a mostrar
        let costoRestriccion = '';
        const constraints: string[] = [];   //Restricciones de tamaño y límites

        for (let i = 0; i < selected_items.length; i++){
            const count = selected_items[i];
            Z += count * objects[i].value;

            //Agregamos los detalles al string de ecuación
            if (i > 0) {
                equation += ' + '
                costoRestriccion += ' + '
            }
            equation += `${objects[i].value} * X_${i + 1}`
            costoRestriccion += `${objects[i].size} * X_${i + 1}`

            //Agregamos restricciones de forma individual
            constraints.push(`0 <= X_${i + 1} <= ${objects[i].amount}`);
        }

        //Agregamos el último detalle a la restricción de costo o peso
        costoRestriccion += ` <= ${bagSize}`

        //Creamos el objeto resultado que sigue la interface
        const result: mathAnswer = {
            Z,
            lista_variables: selected_items,
            equation: equation,
            restriccion: costoRestriccion,
            restricciones: constraints
        }

        return result;
    }

    //Método privado para transportar las matrices
    static transposeTable(table: number[][]) : number[][] {
        return table[0].map((_, colIndex) => table.map(row => row[colIndex]));
    }
        
}
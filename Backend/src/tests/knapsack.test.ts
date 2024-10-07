import { KnapsackItem, mathAnswer, Mochila } from "../dynamic-programming/mochila";

//Ejemplo de testeo
describe('Algoritmo de la mochila', () => {
    test(`Modo 1/0, Size = 8, 4 objetos
        [
            ['anillo', 15000, 1, 1],
            ['Poster de Elvis', 5000, 4, 1],
            ['Radio', 9000, 3, 1],
            ['Candelero', 10000, 5, 1]
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'Anillo', value: 15000, size: 1, amount: 1 },
            { name: 'Poster de Elvis', value: 5000, size: 4, amount: 1 },
            { name: 'Radio', value: 9000, size: 3, amount: 1 },
            { name: 'Candelero', value: 10000, size: 5, amount: 1 }
        ];
        const result = Mochila.knapsack_io(8, items)

        //Expect result: Anillo, Poster de Elvis, Radio are selected
        const expectedSelectedItems = [1, 1, 1, 0];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);
    });
    test(`Modo 1/0, Size = 4, 3 objetos
        [
            ['item A', 10, 1, 1],
            ['item B', 20, 3, 1],
            ['item C', 15, 2, 1],
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'item A', value: 10, size: 1, amount: 1 },
            { name: 'item B', value: 20, size: 3, amount: 1 },
            { name: 'item C', value: 15, size: 2, amount: 1 }
        ];
        const result = Mochila.knapsack_io(4, items)
        //Expect result: Anillo, Poster de Elvis, Radio are selected
        const expectedSelectedItems = [1, 1, 0];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);
    })

    test(`Modo Bounded, Size = 12, Máximo de valores 3, 4 objetos
        [
            ['item A',  6, 4, 3],
            ['item B', 15, 6, 3],
            ['item C',  7, 2, 3],
            ['item D',  9, 5, 3],
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'item A', value:  6, size: 4, amount: 3 },
            { name: 'item B', value: 15, size: 6, amount: 3 },
            { name: 'item C', value:  7, size: 2, amount: 3 },
            { name: 'item D', value:  9, size: 5, amount: 3 }
        ];
        const result = Mochila.knapsack_bounded(12, items)
        //Expect result: Anillo, Poster de Elvis, Radio are selected
        const expectedSelectedItems = [0, 1, 3, 0];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);
    });

    test(`Modo Bounded, Size = 10, Máximo de valores infinito, 3 objetos
        [
            { name: 'Botella de Agua',     value: 11, size: 4, amount: 5},
            { name: 'Calcetines',          value:  7, size: 3, amount: 5},
            { name: 'Paquete de galletas', value: 12, size: 5, amount: 5}
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'Botella de Agua',     value: 11, size: 4, amount: 5},
            { name: 'Calcetines',          value:  7, size: 3, amount: 5},
            { name: 'Paquete de galletas', value: 12, size: 5, amount: 5}
        ];
        const result = Mochila.knapsack_bounded(10, items);
        const expectedSelectedItems = [1, 2, 0];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);
    });

    test(`Modo Unbounded, Size = 10, Máximo de valores infinito, 3 objetos
        [
            { name: 'Botella de Agua',     value: 11, size: 4, amount: Infinity},
            { name: 'Calcetines',          value:  7, size: 3, amount: Infinity},
            { name: 'Paquete de galletas', value: 12, size: 5, amount: Infinity}
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'Botella de Agua',     value: 11, size: 4, amount: Infinity},
            { name: 'Calcetines',          value:  7, size: 3, amount: Infinity},
            { name: 'Paquete de galletas', value: 12, size: 5, amount: Infinity}
        ];
        const result = Mochila.knapsack_unbounded(10, items);
        const expectedSelectedItems = [1, 2, 0];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);

        //Comparamos para checar la función u objeto como tal
        expect(Mochila.get_math_answer(result.selectedItems, items, 10)).toEqual(
            {
                Z: 25,
                lista_variables: [1, 2, 0],
                equation: 'Max Z = 11 * X_1 + 7 * X_2 + 12 * X_3',
                restriccion: '4 * X_1 + 3 * X_2 + 5 * X_3 <= 10',
                restricciones: [
                    '0 <= X_1 <= Infinity',
                    '0 <= X_2 <= Infinity',
                    '0 <= X_3 <= Infinity'
                ]
            }
        )
    });

    test(`Modo Unbounded, Size = 12, Máximo de valores infinito, 5 objetos
        [
            { name: 'Item A', value:  9, size: 3, amount: Infinity},
            { name: 'Item B', value: 13, size: 4, amount: Infinity},
            { name: 'Item C', value: 16, size: 5, amount: Infinity},
            { name: 'Item D', value: 20, size: 6, amount: Infinity},
            { name: 'Item E', value:  7, size: 2, amount: Infinity}
        ]`, () => {
        const items: KnapsackItem[] = [
            { name: 'Item A', value:  9, size: 3, amount: Infinity},
            { name: 'Item B', value: 13, size: 4, amount: Infinity},
            { name: 'Item C', value: 16, size: 5, amount: Infinity},
            { name: 'Item D', value: 20, size: 6, amount: Infinity},
            { name: 'Item E', value:  7, size: 2, amount: Infinity}
        ];
        const result = Mochila.knapsack_unbounded(12, items);
        const expectedSelectedItems = [0, 0, 0, 0, 6];
        expect(result).toBeTruthy();
        expect(result.selectedItems).toEqual(expectedSelectedItems);

        //Comparamos para checar la función u objeto como tal
        expect(Mochila.get_math_answer(result.selectedItems, items, 12)).toEqual(
            {
                Z: 42,
                lista_variables: [0, 0, 0, 0, 6],
                equation: 'Max Z = 9 * X_1 + 13 * X_2 + 16 * X_3 + 20 * X_4 + 7 * X_5',
                restriccion: '3 * X_1 + 4 * X_2 + 5 * X_3 + 6 * X_4 + 2 * X_5 <= 12',
                restricciones: [
                    '0 <= X_1 <= Infinity',
                    '0 <= X_2 <= Infinity',
                    '0 <= X_3 <= Infinity',
                    '0 <= X_4 <= Infinity',
                    '0 <= X_5 <= Infinity'
                ]
            }
        )
    });
})





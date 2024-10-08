import { optimal_binary_search_tree, nodeItem } from "../dynamic-programming/binary-search-tree";

//Ejemplo de testeo
describe('Algoritmo de optimización de árboles', () => {
    test(`4 llaves, [
            { name: 'Entrada1', value: 0.4  },
            { name: 'Entrada2', value: 0.07 },
            { name: 'Entrada3', value: 0.18 },
            { name: 'Entrada4', value: 0.35 }
        ]`, () => {
        const items: nodeItem[] = [
            { name: 'Entrada1', value: 0.4  },
            { name: 'Entrada2', value: 0.07 },
            { name: 'Entrada3', value: 0.18 },
            { name: 'Entrada4', value: 0.35 }
        ]
        const result = optimal_binary_search_tree.obst(items)
        expect(result).toBeTruthy()
    })
})





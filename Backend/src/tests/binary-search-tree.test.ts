import { optimal_binary_search_tree, nodeItem, TreeNode } from "../dynamic-programming/binary-search-tree";

//Ejemplo de testeo
describe('Algoritmo de optimización de árboles', () => {
    test(`4 llaves, [
            { name: 'Harrison', value: 0.18  },
            { name: 'Lennon', value: 0.32 },
            { name: 'McCartney', value: 0.39 },
            { name: 'Starr', value: 0.11 }
        ]`, () => {
        const items: nodeItem[] = [
            { name: 'Harrison', value: 0.18  },
            { name: 'Lennon', value: 0.32 },
            { name: 'McCartney', value: 0.39 },
            { name: 'Starr', value: 0.11 }
        ]
        const result = optimal_binary_search_tree.obst(items)
        expect(result).toBeTruthy();
        expect(result.A).toEqual([
            [       0,     0.18,     0.68,     1.46, 1.79],
            [Infinity,        0,     0.32,     1.03, 1.25],
            [Infinity, Infinity,        0,     0.39, 0.61],
            [Infinity, Infinity, Infinity,        0, 0.11],
            [Infinity, Infinity, Infinity, Infinity,    0]
        ]);
        expect(result.R).toEqual([
            [0, 1, 2, 2, 2],
            [0, 0, 2, 3, 3],
            [0, 0, 0, 3, 3],
            [0, 0, 0, 0, 4],
            [0, 0, 0, 0, 0]
        ])
        const tree = optimal_binary_search_tree.generateTree(result.R, result.sortedNodos);
        const expectedTree : TreeNode = {
            name: 'Lennon',
            value: 0.32,
            left: {
                name: 'Harrison', value: 0.18, left: null, right: null
            },
            right: {
                name: 'McCartney', value: 0.39, left: null,
                right: {
                    name: 'Starr', value: 0.11, left: null, right: null
                }
            }
        }
        expect(tree).toEqual(expectedTree);
    })


    test(`9 llaves, [
        { name: 'Carpenter', value: 0.05  },
        { name: 'Cash', value: 0.07 },
        { name: 'Cobain', value: 0.01 },
        { name: 'Harrison', value: 0.35 },
        { name: 'Hendrix', value: 0.09  },
        { name: 'Joplin', value: 0.23 },
        { name: 'Lennon', value: 0.15 },
        { name: 'Morrison', value: 0.04 },
        { name: 'Presley', value: 0.01 }
    ]`, () => {
    const items: nodeItem[] = [
        { name: 'Carpenter', value: 0.05  },
        { name: 'Cash', value: 0.07 },
        { name: 'Cobain', value: 0.01 },
        { name: 'Harrison', value: 0.35 },
        { name: 'Hendrix', value: 0.09  },
        { name: 'Joplin', value: 0.23 },
        { name: 'Lennon', value: 0.15 },
        { name: 'Morrison', value: 0.04 },
        { name: 'Presley', value: 0.01 }
    ]
    const result = optimal_binary_search_tree.obst(items)
    expect(result).toBeTruthy();
    expect(result.A).toEqual(
        [
            [        0,    0.05,     0.17,     0.19,     0.67,     0.85,     1.40,     1.85,     2.01, 2.06],
            [Infinity,        0,     0.07,     0.09,     0.52,     0.70,     1.25,     1.70,     1.86, 1.91],
            [Infinity, Infinity,        0,     0.01,     0.37,     0.55,     1.10,     1.53,     1.65, 1.69],
            [Infinity, Infinity, Infinity,        0,     0.35,     0.53,     1.08,     1.50,     1.62, 1.66],
            [Infinity, Infinity, Infinity, Infinity,        0,     0.09,     0.41,     0.71,     0.83, 0.87],
            [Infinity, Infinity, Infinity, Infinity, Infinity,        0,     0.23,     0.53,     0.65, 0.69],
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,        0,     0.15,     0.23, 0.26],
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,        0,     0.04, 0.06],
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,        0, 0.01],
            [Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity,    0]
        ]
    );
    expect(result.R).toEqual([
        [0, 1, 2, 2, 4, 4, 4, 4, 4, 4],
        [0, 0, 2, 2, 4, 4, 4, 4, 4, 4],
        [0, 0, 0, 3, 4, 4, 4, 6, 6, 6],
        [0, 0, 0, 0, 4, 4, 4, 6, 6, 6],
        [0, 0, 0, 0, 0, 5, 6, 6, 6, 6],
        [0, 0, 0, 0, 0, 0, 6, 6, 6, 6],
        [0, 0, 0, 0, 0, 0, 0, 7, 7, 7],
        [0, 0, 0, 0, 0, 0, 0, 0, 8, 8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
    const tree = optimal_binary_search_tree.generateTree(result.R, result.sortedNodos);
    const expectedTree: TreeNode = {
        name: 'Harrison',
        value: 0.35,
        left: {
            name: 'Cash',
            value: 0.07,
            left: { name: 'Carpenter', value: 0.05, left: null, right: null },
            right: { name: 'Cobain', value: 0.01, left: null, right: null }
        },
        right: {
            name: 'Joplin',
            value: 0.23, 
            left: { name: 'Hendrix', value: 0.09, left: null, right: null },
            right: { name: 'Lennon', value: 0.15, left: null,
                right: {
                    name: 'Morrison', value: 0.04, left: null,
                    right: { name: 'Presley', value: 0.01, left: null, right: null }
                }
            }
        }
    }
    expect(tree).toEqual(expectedTree);
})
})





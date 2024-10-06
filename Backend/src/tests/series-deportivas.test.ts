import { SeriesDeportivas } from "../dynamic-programming/series-deportivas";

//Ejemplo de testeo
describe('Series Deportivas', () => {
    const solucion = new SeriesDeportivas();

    test(`Prueba: Ph = 0.6, Pr = 0.5, toWin = 3, ['A', 'A', 'B', 'B', 'B']`, () => {
        const result = solucion.series_deportivas(60, 50, ['A', 'A', 'B', 'B', 'B']);
        const expected = [
            [NaN,   1.0,  1.0,   1.0],
            [  0,   0.5, 0.75, 0.875],
            [  0,  0.25,  0.5, 0.725],
            [  0, 0.125, 0.35, 0.575]
        ];
        expect(result).toBeTruthy()
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })

    test(`Prueba: Ph = 0.35, Pr = 0.25, toWin = 2, ['A', 'B', 'A']`, () => {
        const result = solucion.series_deportivas(35, 25, ['A', 'B', 'A']);
        const expected = [
            [NaN,     1.0,    1.0],
            [  0,    0.35, 0.5125],
            [  0,  0.0875, 0.2362]
        ];
        expect(result).toBeTruthy();
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })

    test(`Prueba: Ph = 0.55, Pr = 0.30, toWin = 4, ['A','A','A','B','A','B','B']`, () => {
        const result = solucion.series_deportivas(55, 30, ['A','A','A','B','A','B','B']);
        const expected = [
            [NaN,     1.0,    1.0,    1.0,    1.0],
            [  0,     0.3,   0.51, 0.7795, 0.8457],
            [  0,    0.09,  0.321, 0.4586, 0.6715],
            [  0,  0.0495,  0.131, 0.3112, 0.5094],
            [  0,  0.0149, 0.0788, 0.2066, 0.3731]
        ];
        expect(result).toBeTruthy();
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })

    test(`Prueba: Ph = 0.58, Pr = 0.47, toWin = 1, ['B']`, () => {
        const result = solucion.series_deportivas(58, 47, ['B']);
        const expected = [
            [NaN,   1.0],
            [  0,  0.47]
        ];
        expect(result).toBeTruthy();
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })

    test(`Prueba: Ph = 0.55, Pr = 0.30, toWin = 5, ['A','B','B','A','B','B','A','A','B']`, () => {
        const result = solucion.series_deportivas(42, 18, ['A','B','B','A','B','B','A','A','B']);
        const expected = [
            [NaN,     1.0,    1.0,    1.0,    1.0,    1.0],
            [  0,    0.18, 0.5244, 0.7241, 0.7737, 0.8144],
            [  0,  0.0756, 0.2641, 0.3469, 0.4237, 0.5878],
            [  0,  0.0317, 0.0735, 0.1227, 0.2491, 0.3101],
            [  0,  0.0057, 0.0179, 0.0619, 0.0956, 0.1342],
            [  0,  0.001, 0.0081, 0.0178, 0.0318, 0.0748]
        ];
        expect(result).toBeTruthy();
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })

    test(`Prueba: Ph = 0.85, Pr = 0.60, toWin = 6, ['A','A','B','B','A','A','A','B','B','B','A']`, () => {
        const result = solucion.series_deportivas(85, 60, ['A','A','B','B','A','A','A','B','B','B','A']);
        const expected = [
            [NaN,     1.0,    1.0,    1.0,    1.0,    1.0,    1.0],
            [  0,    0.85,   0.94,  0.976, 0.9904,  0.9986, 0.9998],
            [  0,    0.51,  0.768, 0.8928, 0.9756,  0.9951, 0.9991],
            [  0,   0.306, 0.5832, 0.8464, 0.9563,  0.9893, 0.9951],
            [  0,  0.1836, 0.5233, 0.7979, 0.9326,  0.9666, 0.9837],
            [  0,  0.1561, 0.4682, 0.7484, 0.8589,  0.9235, 0.9747],
            [  0,  0.1326, 0.4178, 0.6162, 0.7618,  0.8993, 0.9634]
        ];
        expect(result).toBeTruthy();
        result.forEach((row, i) => {
            row.forEach((value, j) => {
                if (i === 0 && j === 0) return; //Skip al caso de NaN o la primera columna y fila
                expect(value).toBeCloseTo(expected[i][j], 3);
            })
        })
    })
})





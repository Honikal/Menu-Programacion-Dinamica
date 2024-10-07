export class SeriesDeportivas {
    //Creamos el método de Series deportivas

    series_deportivas(
        probabilidadGanarEnCasa: number,
        probabilidadGanarVisitante: number,
        listaJuegos: string[]
    ) : number[][] {
        /*Primero, sacamos el valor de toWin, que es básicamente el tamaño de la lista de juegos,
        dividido entero entre 2, + 1*/
        const toWin = Math.floor(listaJuegos.length / 2) + 1;
        const dp: number[][] = Array.from(
            { length: toWin + 1 }, () => Array(toWin + 1).fill(0)
        );

        //Creamos las probabilidades
        const ph = probabilidadGanarEnCasa / 100;
        const pr = probabilidadGanarVisitante / 100;
        const qr = 1 - ph;
        const qh = 1 - pr; 

        /*Casos trivial inicial, llenamos los campos de la fila 1 de 1, y el valor de la izquina
        superior izquierda en 0*/
        dp[0].fill(1.0);
        dp[0][0] = NaN

        for (let i = 1; i < dp.length; i++){
            for (let j = 1; j < dp.length; j++){
                const partidaActual = (toWin - i) + (toWin - j);

                if (listaJuegos[partidaActual] == 'A'){
                    dp[i][j] = ph * dp[i-1][j] + qr * dp[i][j-1]
                } else {
                    dp[i][j] = pr * dp[i-1][j] + qh * dp[i][j-1]
                }

                //Redondear el valor a 4 decimales
                dp[i][j] = Math.round(dp[i][j] * 10000) / 10000;
            }
        }

        return dp;
    }
}

export const addMatrices = (
  matrixA: number[][],
  matrixB: number[][]
): number[][] => {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    throw new Error("Matrices must have the same dimensions");
  }

  return matrixA.map((row, rowIndex) =>
    row.map((val, colIndex) => {
      const bValue = matrixB[rowIndex][colIndex];
      return val + bValue;
    })
  );
};

export const subtractMatrices = (
  matrixA: number[][],
  matrixB: number[][]
): number[][] => {
  return matrixA.map((row, rowIndex) =>
    row.map((val, colIndex) => val - matrixB[rowIndex][colIndex])
  );
};

export const multiplyMatrices = (
  matrixA: number[][],
  matrixB: number[][],
  size: number
): number[][] => {
  const result = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
};

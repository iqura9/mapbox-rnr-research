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

export const calculateDeterminant = (matrix: number[][]): number => {
  const n = matrix.length;

  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  let determinant = 0;

  for (let i = 0; i < n; i++) {
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, colIndex) => colIndex !== i));

    determinant +=
      matrix[0][i] * calculateDeterminant(subMatrix) * (i % 2 === 0 ? 1 : -1);
  }

  return determinant;
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

export const inverseMatrix = (matrix: number[][]): number[][] | null => {
  const n = matrix.length;
  const det = calculateDeterminant(matrix);

  if (det === 0) {
    return null;
  }

  if (n === 2) {
    return [
      [matrix[1][1] / det, -matrix[0][1] / det],
      [-matrix[1][0] / det, matrix[0][0] / det],
    ];
  }

  const adjugateMatrix = matrix.map((row, rowIndex) =>
    row.map((_, colIndex) => {
      const subMatrix = matrix
        .filter((_, i) => i !== rowIndex)
        .map((row) => row.filter((_, j) => j !== colIndex));

      const cofactor =
        calculateDeterminant(subMatrix) *
        ((rowIndex + colIndex) % 2 === 0 ? 1 : -1);

      return cofactor;
    })
  );

  const transposeMatrix = adjugateMatrix[0].map((_, colIndex) =>
    adjugateMatrix.map((row) => row[colIndex])
  );

  const inverse = transposeMatrix.map((row) => row.map((value) => value / det));

  return inverse;
};

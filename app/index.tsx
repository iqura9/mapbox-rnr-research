import React, { useState } from "react";
import { Text, View } from "react-native";
import MatrixButton from "~/components/MatrixButton";
import MatrixInput from "~/components/MatrixInput";

import { addMatrices, multiplyMatrices, subtractMatrices } from "~/utils/index";
const MainScreen: React.FC = () => {
  const [size, setSize] = useState<number>(4);
  const [matrixA, setMatrixA] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(0))
  );
  const [matrixB, setMatrixB] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(0))
  );
  const [result, setResult] = useState<number[][] | null>(null);

  const handleAdd = () => {
    setResult(addMatrices(matrixA, matrixB));
  };

  const handleSubtract = () => {
    setResult(subtractMatrices(matrixA, matrixB));
  };

  const handleMultiply = () => {
    setResult(multiplyMatrices(matrixA, matrixB, size));
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Matrix Calculator
      </Text>

      <Text className="text-lg mb-2">Matrix A:</Text>
      <MatrixInput matrix={matrixA} setMatrix={setMatrixA} />

      <Text className="text-lg mb-2">Matrix B:</Text>
      <MatrixInput matrix={matrixB} setMatrix={setMatrixB} />

      <View className="flex-row justify-around mt-4">
        <MatrixButton title="Add" onPress={handleAdd} />
        <MatrixButton title="Subtract" onPress={handleSubtract} />
        <MatrixButton title="Multiply" onPress={handleMultiply} />
      </View>

      {result ? (
        <View className="mt-4">
          <Text className="text-lg mb-2">Result:</Text>
          {result.map((row, rowIndex) => (
            <View key={rowIndex} className="flex-row justify-center">
              {row.map((val, colIndex) => (
                <Text
                  key={colIndex}
                  className="border border-foreground p-2 m-1 w-12 text-center"
                >
                  {val}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default MainScreen;

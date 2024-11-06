import React from "react";
import { TextInput, View } from "react-native";

interface MatrixInputProps {
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
}

const MatrixInput: React.FC<MatrixInputProps> = ({ matrix, setMatrix }) => {
  const handleInputChange = (value: string, row: number, col: number) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  return (
    <View className="p-4">
      {matrix.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-center">
          {row.map((val, colIndex) => (
            <TextInput
              key={colIndex}
              className="border border-foreground p-2 m-1 w-12 text-center text-foreground"
              keyboardType="numeric"
              value={String(matrix[rowIndex][colIndex])}
              onChangeText={(text: string) => handleInputChange(text, rowIndex, colIndex)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export default MatrixInput;

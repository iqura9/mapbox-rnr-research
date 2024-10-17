import * as FileSystem from "expo-file-system";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import MatrixButton from "~/components/MatrixButton";
import MatrixInput from "~/components/MatrixInput";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

import {
  addMatrices,
  calculateDeterminant,
  inverseMatrix,
  multiplyMatrices,
  subtractMatrices,
} from "~/utils/index";

const MATRIX_SIZE = 4;

const MainScreen: React.FC = () => {
  const [size, setSize] = useState<number>(MATRIX_SIZE);

  const [det, setDet] = useState<number | null>(null);

  const [matrixA, setMatrixA] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(0))
  );
  const [matrixB, setMatrixB] = useState<number[][]>(
    Array.from({ length: size }, () => Array(size).fill(0))
  );

  useEffect(() => {
    setMatrixA(() => Array.from({ length: size }, () => Array(size).fill(0)));
    setMatrixB(() => Array.from({ length: size }, () => Array(size).fill(0)));
    setDet(null);
  }, [size]);

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

  const handleDeterminant = () => {
    setDet(calculateDeterminant(matrixA));
  };

  const handleInvert = () => {
    setResult(inverseMatrix(matrixA));
  };

  const saveMatricesToFile = async () => {
    const fileUri = FileSystem.documentDirectory + "matrices.txt";

    const content = `Matrix A:\n${matrixA
      .map((row) => row.join(", "))
      .join("\n")}\n\nMatrix B:\n${matrixB
      .map((row) => row.join(", "))
      .join("\n")}\n\nResult:\n${
      result ? result.map((row) => row.join(", ")).join("\n") : "No result"
    }`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      Alert.alert("Success", `Matrices saved to: ${fileUri}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save matrices to file.");
    }
  };

  const chartData = {
    labels: Array.from({ length: size }, (_, i) => `Row ${i + 1}`),
    datasets: [
      {
        data: result ? result.flat() : Array(size).fill(0),
      },
    ],
  };

  const handleIncrement = () => {
    setSize((prev) => Math.min(prev + 1, 7));
  };

  const handleDecrement = () => {
    setSize((prev) => Math.max(prev - 1, 1));
  };

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold text-center mb-4">
        Matrix Calculator
      </Text>
      <Link
        href="/aboutMe"
        className="text-foreground text-2xl font-bold text-center mb-4"
      >
        About Me
      </Link>
      <View className="flex flex-row gap-3">
        <Button onPress={handleIncrement}>
          <Text>+</Text>
        </Button>
        <Button onPress={handleDecrement}>
          <Text>-</Text>
        </Button>
        {det !== null ? <Text>Determinant: {det}</Text> : null}
      </View>

      <Text className="text-lg mb-2">Matrix A:</Text>
      <MatrixInput matrix={matrixA} setMatrix={setMatrixA} />
      <Text className="text-lg mb-2">Matrix B:</Text>
      <MatrixInput matrix={matrixB} setMatrix={setMatrixB} />
      <View className="flex-row justify-around mt-4">
        <MatrixButton title="Add" onPress={handleAdd} />
        <MatrixButton title="Subtract" onPress={handleSubtract} />
        <MatrixButton title="Multiply" onPress={handleMultiply} />
        <MatrixButton title="Invert" onPress={handleInvert} />
        <MatrixButton title="Det" onPress={handleDeterminant} />
        <MatrixButton title="Save" onPress={saveMatricesToFile} />
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

          <Text className="text-lg mb-2 mt-4">Chart Visualization:</Text>
          <BarChart
            data={chartData}
            width={Dimensions.get("window").width - 30}
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#f0f4c3",
              backgroundGradientTo: "#c5e1a5",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(34, 150, 243, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                paddingRight: 20,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "2",
                stroke: "#4caf50",
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            withInnerLines={false}
            withHorizontalLabels={true}
            horizontalLabelRotation={30}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

export default MainScreen;

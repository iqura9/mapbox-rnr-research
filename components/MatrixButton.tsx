import React from "react";
import { Text } from "react-native";
import { Button } from "./ui/button";

interface MatrixButtonProps {
  title: string;
  onPress: () => void;
}

const MatrixButton: React.FC<MatrixButtonProps> = ({ title, onPress }) => (
  <Button variant="default" onPress={onPress} className="bg-blue-500 p-2 m-1 rounded">
    <Text>{title}</Text>
  </Button>
);

export default MatrixButton;

import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface MatrixButtonProps {
  title: string;
  onPress: () => void;
}

const MatrixButton: React.FC<MatrixButtonProps> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} className="bg-blue-500 p-2 m-1 rounded">
    <Text className="text-white text-center">{title}</Text>
  </TouchableOpacity>
);

export default MatrixButton;

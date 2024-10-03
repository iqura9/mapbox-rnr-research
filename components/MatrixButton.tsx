import React from "react";
import { Button } from "./ui/button";

interface MatrixButtonProps {
  title: string;
  onPress: () => void;
}

const MatrixButton: React.FC<MatrixButtonProps> = ({ title, onPress }) => (
  <Button
    variant="default"
    onPress={onPress}
    className="bg-blue-500 p-2 m-1 rounded"
  >
    {title}
  </Button>
);

export default MatrixButton;

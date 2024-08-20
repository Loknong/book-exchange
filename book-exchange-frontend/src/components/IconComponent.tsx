import React from "react";
import { IconType } from "react-icons";

interface IconComponentProps {
  icon: IconType;
  size?: string;
  color?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({
  icon: Icon,
  size = "1em",
  color = "black",
}) => {
  return <Icon size={size} color={color} />;
};

export default IconComponent;

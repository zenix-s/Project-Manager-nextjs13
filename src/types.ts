import { IconType } from "react-icons";
export interface TareaProps {
  id: number;
  nombre: string;
  description: string;
  id_estado: number;
  endDate: Date;
  id_proyecto: number;
  id_usuario: number;
}

export interface EstadoProps {
  id: number;
  nombre: string;
  id_proyecto: number;
  color: string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  theme: "light" | "dark" | "transparent";
  textColor: "black" | "white";
  hoverEffect?: "whiter" | "darker" | "none";
  icon?: IconType;
  shadow?: boolean;
  center?: boolean;
  padding?: boolean;
  uppercase?: boolean;
  fullWidth?: boolean;
}
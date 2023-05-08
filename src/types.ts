import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface UserProps {
  id: string;
  name: string;
  email: string;
}
export interface TareaProps {
  id: number;
  nombre: string;
  description: string | null;
  endDate: Date | null;
  id_estado: number;
  id_proyecto: number;
  id_usuario: number | null;
}

export interface TeamMembersProps {
  id: number;
  id_proyecto: number;
  id_usuario: number;
  rol: string;
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

export interface InputProps {
  id: string;
  label: string;
  type: string;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export interface NavBarLinkProps {
  label: string;
  href: string;
  icon: IconType;
}

export interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

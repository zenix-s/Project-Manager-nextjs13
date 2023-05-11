import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export interface AssigmentsProps {
  id: number;
  userId: number;
  projectId: number;
  role: string;
}

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  creationDate: Date;
  endDate: Date;
  role: string;
}

export interface TareaProps {
  id: number;
  nombre: string;
  description: string | null;
  endDate: Date | null;
  completed: boolean;
  id_estado: number;
  id_proyecto: number;
  id_usuario: number | null;
}

export interface TeamMemberProps {
  id: number;
  id_proyecto: number;
  id_usuario: number;
  rol: string;
  users: {
    username: string;
  };
}

export interface EstadoProps {
  id: number;
  nombre: string;
  id_proyecto: number;
  color: string;
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

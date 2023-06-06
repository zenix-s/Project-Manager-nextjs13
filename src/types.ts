import { IconType } from "react-icons";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export interface UseUserProps{
  id: number;
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
  archived: boolean;
}

export interface TaskProps {
  id: number;
  name: string;
  description: string | null;
  endDate: Date | null;
  completed: boolean;
  stateId: number;
  projectId: number;
  userId: number | null;
  archived: boolean;
  createdDate: Date;
}

export interface TeamMemberProps {
  id: number;
  projectId: number;
  userId: number;
  // role: "owner" | "admin" | "member" | "viewer";
  role: string;
  users: {
    username: string;
  };

}

export interface StateProps {
  id: number;
  name: string;
  projectId: number;
  color: string;
  autoComplete: boolean;
}

export interface InvitationProps {

  id: number;
  receiverEmail: string;
  projectId: number;
  senderId: number;
  status: "Pendiente" | "Aceptado" | "Rechazado";
  createdDate: Date;

}

export interface InputProps {
  id: string;
  label: string;
  type: string;
  defaultValue?: string | null;
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

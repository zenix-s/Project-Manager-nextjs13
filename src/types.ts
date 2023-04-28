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
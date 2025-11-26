export interface Riesgo {
  riesgo_id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  area_proceso: string;
  probabilidad: number;
  impacto: number;
  nivel_riesgo: number;
  estado: string;
  fecha_alta: string | null;
  responsable_id: number;
}

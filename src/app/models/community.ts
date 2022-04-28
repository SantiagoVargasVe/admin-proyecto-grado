export interface Community {
  id?: string;
  descripción: {
    cuerpo: string;
    imagenes: string[];
  };
  estudiantes: Array<string>;
}

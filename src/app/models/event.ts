import { Timestamp } from '@angular/fire/firestore';

export interface Event {
  fecha: Timestamp;
  hora_inicio: Timestamp;
  hora_fin: Timestamp;
  lugar: string;
  titulo: string;
}

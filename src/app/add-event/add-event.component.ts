import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Event } from '../models/event';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  createEventForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    timeStart: new FormControl('', [Validators.required]),
    timeEnd: new FormControl('', [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public dialogRef: MatDialogRef<AddEventComponent>,
    private afs: AngularFirestore
  ) {}

  createEvent() {
    const hora_inicio = this.timeToTimeStamp(
      this.createEventForm.value.timeStart
    );
    const hora_fin = this.timeToTimeStamp(this.createEventForm.value.timeEnd);
    const fecha = this.dateToTimeStamp(this.createEventForm.value.date);

    const event: Event = {
      fecha,
      hora_inicio,
      hora_fin,
      lugar: this.createEventForm.value.place,
      titulo: this.createEventForm.value.name,
    };

    this.afs.collection(`comunidades/${this.data.id}/actividades`).add(event);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  dateToTimeStamp(date: string) {
    const fecha = date.split('-');
    const fechaInicio = new Date();
    fechaInicio.setFullYear(
      Number(fecha[0]),
      Number(fecha[1]) - 1,
      Number(fecha[2])
    );

    return Timestamp.fromDate(fechaInicio);
  }

  timeToTimeStamp(time: string) {
    const hora = time.split(':');
    const horaInicio = new Date();
    horaInicio.setHours(Number(hora[0]), Number(hora[1]), 0);

    return Timestamp.fromDate(horaInicio);
  }

  ngOnInit(): void {}
}

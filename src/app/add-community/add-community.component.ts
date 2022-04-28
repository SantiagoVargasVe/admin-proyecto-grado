import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, lastValueFrom } from 'rxjs';
import { Community } from '../models/community';
import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.component.html',
  styleUrls: ['./add-community.component.scss'],
})
export class AddCommunityComponent implements OnInit {
  selectedFiles: any[] = [];
  urlOfFiles: any[] = [];
  downloadURL!: Observable<string>;
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<AddCommunityComponent>
  ) {}

  createCommunityForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}

  onFilesChanges(event: any) {
    this.selectedFiles = event.target.files;
  }

  async uploadFiles() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const filePath = `comunidades/${this.createCommunityForm.value.name}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            this.downloadURL = fileRef.getDownloadURL();
            const url = await lastValueFrom(this.downloadURL);
            this.urlOfFiles.push(url);
            if (this.urlOfFiles.length === this.selectedFiles.length) {
              this.addCommunity();
            }
            return this.downloadURL;
          })
        )
        .subscribe();
    }
  }

  addCommunity() {
    const id = this.createCommunityForm.value.name;
    const community: Community = {
      descripción: {
        cuerpo: this.createCommunityForm.value.description,
        imagenes: this.urlOfFiles,
      },
      estudiantes: [],
    };
    this.afs.collection('comunidades').doc(id).set(community);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

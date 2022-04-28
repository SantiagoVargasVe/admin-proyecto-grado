import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Community } from '../models/community';
import { Observable } from 'rxjs';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AddCommunityComponent } from '../add-community/add-community.component';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  communities!: Observable<Community[]>;

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) {
    this.communities = this.afs
      .collection<Community>('comunidades')
      .valueChanges({ idField: 'id' }) as Observable<Community[]>;
    this.communities.subscribe((data) => {
      console.log(data);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommunityComponent, {
      width: '500px',
      data: {},
    });
  }

  ngOnInit(): void {}
}

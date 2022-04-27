import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Community } from '../models/community';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  communities!: Observable<Community[]>;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    public afAuth: AngularFireAuth
  ) {
    this.communities = this.afs
      .collection<Community>('comunidades')
      .valueChanges({ idField: 'id' }) as Observable<Community[]>;
    this.communities.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {}
}

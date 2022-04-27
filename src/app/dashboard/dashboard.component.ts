import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserData } from '../models/userData';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private firestore: AngularFirestore) {}
  public user$!: Observable<UserData>;
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user$ = this.firestore
      .doc<UserData>(`users/${user.uid}`)
      .valueChanges() as Observable<UserData>;
  }
}

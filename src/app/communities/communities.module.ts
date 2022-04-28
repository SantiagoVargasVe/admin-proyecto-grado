import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesRoutingModule } from './communities-routing.module';
import { CommunitiesComponent } from './communities.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddCommunityComponent } from '../add-community/add-community.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommunitiesComponent, AddCommunityComponent],
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class CommunitiesModule {}

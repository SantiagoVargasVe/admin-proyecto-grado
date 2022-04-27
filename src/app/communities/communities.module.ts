import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesRoutingModule } from './communities-routing.module';
import { CommunitiesComponent } from './communities.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [CommunitiesComponent],
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class CommunitiesModule {}

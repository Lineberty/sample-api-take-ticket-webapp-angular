import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { QueuesComponent } from './pages/queues/queues.component';
import { SelectGroupSizeComponent } from './pages/select-group-size/select-group-size.component';
import { SelectTimeslotComponent } from './pages/select-timeslot/select-timeslot.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { SelectAppointmentTypeComponent } from './pages/select-appointment-type/select-appointment-type.component';
import { ObjetToArrayPipe } from './pipes/objet-to-array.pipe';
import {MatButtonModule, MatCardModule, MatDialogModule, MatListModule} from '@angular/material';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlacesComponent,
    QueuesComponent,
    SelectGroupSizeComponent,
    SelectTimeslotComponent,
    TicketsComponent,
    SelectAppointmentTypeComponent,
    ObjetToArrayPipe,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

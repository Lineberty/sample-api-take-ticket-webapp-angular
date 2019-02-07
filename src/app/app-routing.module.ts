import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { PlacesComponent } from "./pages/places/places.component";
import { QueuesComponent } from "./pages/queues/queues.component";
import { SelectGroupSizeComponent } from "./pages/select-group-size/select-group-size.component";
import { SelectTimeslotComponent } from "./pages/select-timeslot/select-timeslot.component";
import { TicketsComponent } from "./pages/tickets/tickets.component";
import { SelectAppointmentTypeComponent } from "./pages/select-appointment-type/select-appointment-type.component";

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'queues', component: QueuesComponent },
  { path: 'select-appointment-type', component: SelectAppointmentTypeComponent },
  { path: 'select-group-size', component: SelectGroupSizeComponent },
  { path: 'select-timeslot', component: SelectTimeslotComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

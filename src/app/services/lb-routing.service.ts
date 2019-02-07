import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LbRoutingService {

  listOfPages = {
    'HOME': 'home',
    'PLACES': 'places',
    'QUEUES': 'queues',
    'SELECT_APPOINTMENT_TYPE': 'select-appointment-type',
    'SELECT_GROUP_SIZE': 'select-group-size',
    'SELECT_TIMESLOT': 'select-timeslot',
    'TICKETS': 'tickets'
  }

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  goToPlace() {
    return this.router.navigate(['/places']);
  }

  nextPage( currentPage ) {

    switch (currentPage) {
      case this.listOfPages.HOME:
        return this.router.navigate(['/places']);

      case this.listOfPages.PLACES:
        return this.router.navigate(['/queues']);

      case this.listOfPages.QUEUES:
        if (
          this.localStorage.selectedQueue
          && this.localStorage.selectedQueue.appointmentTypes
          && Object.keys( this.localStorage.selectedQueue.appointmentTypes ).length > 1
        ) {
          return this.router.navigate(['/select-appointment-type']);

        } else {
          const appointmentTypeId = Object.keys( this.localStorage.selectedQueue.appointmentTypes )[0]
          this.localStorage.selectedAppointmentType = this.localStorage.selectedQueue.appointmentTypes[ appointmentTypeId ]
          return this.nextPage( this.listOfPages.SELECT_APPOINTMENT_TYPE )
        }

      case this.listOfPages.SELECT_APPOINTMENT_TYPE:
        if (
          this.localStorage.selectedQueue
          && this.localStorage.selectedQueue.config
          && this.localStorage.selectedQueue.config.groupSizeLimit
          && this.localStorage.selectedQueue.config.groupSizeLimit.min
          && this.localStorage.selectedQueue.config.groupSizeLimit.max
          && this.localStorage.selectedQueue.config.groupSizeLimit.min !== this.localStorage.selectedQueue.config.groupSizeLimit.max
        ) {
          return this.router.navigate(['/select-group-size']);

        } else {
          this.localStorage.selectedGroupSize = 1
          return this.nextPage( this.listOfPages.SELECT_GROUP_SIZE )
        }

      case this.listOfPages.SELECT_GROUP_SIZE:
        return this.router.navigate(['/select-timeslot']);

      case this.listOfPages.SELECT_TIMESLOT:
        return this.router.navigate(['/tickets']);

      case this.listOfPages.TICKETS:
        return this.router.navigate(['/home']);
    }

  }
}

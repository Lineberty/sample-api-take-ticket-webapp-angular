import { Component, OnInit } from '@angular/core';
import { LbHttpService } from '../../services/lb-http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { LbRoutingService } from '../../services/lb-routing.service';

@Component({
  selector: 'app-select-timeslot',
  templateUrl: './select-timeslot.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class SelectTimeslotComponent implements OnInit {

  constructor(private lbHttp: LbHttpService, private localStorage: LocalStorageService, private lbRouting: LbRoutingService) { }

  availabilities

  async ngOnInit() {

    if (
      !this.localStorage.selectedQueue
      || !this.localStorage.selectedQueue.queueId
      || !this.localStorage.selectedAppointmentType
      || !this.localStorage.selectedAppointmentType.appointmentTypeId
      || !this.localStorage.selectedGroupSize
    ) {
      this.lbRouting.goToPlace()
    }

    (await this.lbHttp.getQueueAvailability()).subscribe(( res ) => {
      console.log('Queues availabilities res')
      console.log( res )
      this.availabilities = res
    }, ( error ) => {
      console.log('Error while getting queues availabilities')
      console.log( error )
    })
  }

  async selectTimeslot( availability ) {

    this.localStorage.selectedBookedFor = availability

    try {
      const res = await (await this.lbHttp.bookingTicket()).toPromise()
      console.log('Ticket received')
      console.log( res )
      this.lbRouting.nextPage( this.lbRouting.listOfPages.SELECT_TIMESLOT )

    } catch (err) {
      console.log('Error while getting queues availabilities')
      console.log( err )
      alert( err.error.error )
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../../services/local-storage.service";
import { LbRoutingService } from "../../services/lb-routing.service";
import { ConfigService } from "../../services/config.service";

@Component({
  selector: 'app-select-appointment-type',
  templateUrl: './select-appointment-type.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class SelectAppointmentTypeComponent implements OnInit {

  constructor(private config: ConfigService, private localStorage: LocalStorageService, private lbRouting: LbRoutingService) { }

  async ngOnInit() {

    if ( !this.localStorage.selectedQueue || !this.localStorage.selectedQueue.appointmentTypes ) {
      this.lbRouting.goToPlace()
    }
  }

  selectAppointmentType( appointmentType ) {
    this.localStorage.selectedAppointmentType = appointmentType
    this.lbRouting.nextPage( this.lbRouting.listOfPages.SELECT_APPOINTMENT_TYPE )
  }

}

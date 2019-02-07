import { Component, OnInit } from '@angular/core';
import { LbHttpService } from "../../services/lb-http.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { LbRoutingService } from "../../services/lb-routing.service";
import { ConfigService } from "../../services/config.service";

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class QueuesComponent implements OnInit {

  constructor(private config: ConfigService, private lbHttp: LbHttpService, private localStorage: LocalStorageService, private lbRouting: LbRoutingService) { }

  async ngOnInit() {

    if ( !this.localStorage.selectedPlace || !this.localStorage.selectedPlace.placeId ) {
      this.lbRouting.goToPlace()
    }

    (await this.lbHttp.getQueuesOfPlace()).subscribe(( res ) => {
      console.log('Queues of place received')
      console.log( res )
    }, ( error ) => {
      console.log('Error while getting queues of place')
      console.log( error )
    })
  }

  selectQueue( queue ) {
    this.localStorage.selectedQueue = queue
    this.lbRouting.nextPage( this.lbRouting.listOfPages.QUEUES )
  }

}

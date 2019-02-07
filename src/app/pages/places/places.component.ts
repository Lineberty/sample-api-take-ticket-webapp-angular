import { Component, OnInit } from '@angular/core';
import { LbHttpService } from "../../services/lb-http.service";
import { LocalStorageService } from "../../services/local-storage.service";
import { LbRoutingService } from "../../services/lb-routing.service";
import { ConfigService } from "../../services/config.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class PlacesComponent implements OnInit {

  constructor(private config: ConfigService, private lbHttp: LbHttpService, private localStorage: LocalStorageService, private lbRouting: LbRoutingService) { }

  async ngOnInit() {
    (await this.lbHttp.getPlaces()).subscribe(( res ) => {
      console.log('Places received')
      console.log( res )
    }, ( error ) => {
      console.log('Error while getting places')
      console.log( error )
    })
  }

  selectPlace( place ) {
    this.localStorage.selectedPlace = place
    this.lbRouting.nextPage( this.lbRouting.listOfPages.PLACES )
  }

}

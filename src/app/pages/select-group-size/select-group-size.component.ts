import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {LbRoutingService} from "../../services/lb-routing.service";

@Component({
  selector: 'app-select-group-size',
  templateUrl: './select-group-size.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class SelectGroupSizeComponent implements OnInit {

  availableGroupSize: any

  constructor(private localStorage: LocalStorageService, private lbRouting: LbRoutingService) { }

  async ngOnInit() {

    if (
      !this.localStorage.selectedQueue
      || !this.localStorage.selectedQueue.config
      || !this.localStorage.selectedQueue.config.groupSizeLimit
      || !this.localStorage.selectedQueue.config.groupSizeLimit.min
      || !this.localStorage.selectedQueue.config.groupSizeLimit.max
    ) {
      this.lbRouting.goToPlace()
    }

    let groupSizeMin = this.localStorage.selectedQueue.config.groupSizeLimit.min
    let groupSizeMax = this.localStorage.selectedQueue.config.groupSizeLimit.max
    this.availableGroupSize = Array( groupSizeMax - groupSizeMin ).fill(0).map((x,i) => (groupSizeMin + i) )

  }

  selectGroupSize( groupSize ) {
    this.localStorage.selectedGroupSize = groupSize
    this.lbRouting.nextPage( this.lbRouting.listOfPages.SELECT_GROUP_SIZE )
  }

}

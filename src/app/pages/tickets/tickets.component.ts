import { Component, OnInit } from '@angular/core';
import { LbHttpService } from '../../services/lb-http.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { LbRoutingService } from '../../services/lb-routing.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: [ '../../app.component.scss' ]
})
export class TicketsComponent implements OnInit {

  constructor(
    private lbHttp: LbHttpService,
    private localStorage: LocalStorageService,
    private lbRouting: LbRoutingService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.loadTickets()
  }

  async loadTickets () {
    (await this.lbHttp.getTickets()).subscribe(( res ) => {
      console.log('User tickets res')
      console.log( res )
    }, ( error ) => {
      console.log('Error while getting user tickets')
      console.log( error )
    })
  }

  cancelTicket( ticket: any ) {
    const data: any = {
      width: '250px',
      data: {
        title: 'Confirmation',
        text: 'Are you sure to want to cancel this ticket ?',
        confirm: 'yes',
        cancel: 'no'
      }
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, data);

    dialogRef.afterClosed().subscribe(async result => {

      if ( result && result.res ) {

        (await this.lbHttp.cancelTicket( ticket.ticketId )).subscribe(async ( res ) => {
          console.log('User tickets cancelled')
          console.log( res )
          await this.loadTickets()
        }, ( error ) => {
          console.log('Error while cancelled user ticket')
          console.log( error )
        })

      }

    });
  }

  reportTicket() {
    const data: any = {
      width: '250px',
      data: {
        title: 'Documentation',
        text: 'Watch the document for more informations',
        confirm: 'Ok',
        cancel: ''
      }
    }
    this.dialog.open(ConfirmDialogComponent, data);
  }

  rateTicket() {
    const data: any = {
      width: '250px',
      data: {
        title: 'Documentation',
        text: 'Watch the document for more informations',
        confirm: 'Ok',
        cancel: ''
      }
    }
    this.dialog.open(ConfirmDialogComponent, data);
  }

  getTicketState ( state ) {

    switch ( state ) {
      case 0:
        return 'BOOKED'
      case 1:
        return 'ALERTED'
      case 2:
        return 'CALLED'
      case 3:
        return 'ON HOLD'
      case 4:
        return 'NO SHOW'
      case 5:
        return 'IN PROGRESS'
      case 6:
        return 'CANCELLED'
      case 7:
        return 'DONE'
    }

  }

}

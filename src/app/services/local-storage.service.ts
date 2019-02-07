import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  apiKey: string = ''
  userId: string = ''
  userBearer: string = ''
  userBearerEnding: any = null
  sessionId: string = ''

  places: any = null
  selectedPlace: any = null

  queues: any = null
  queuesOfSelectedPlace: any = null
  selectedQueue: any = null

  selectedAppointmentType: any = null

  selectedGroupSize: number = null

  selectedBookedFor: any = null

  tickets: any = null

  constructor( private config: ConfigService ){}

  getApiKey() {
    return window.localStorage.getItem('apiKey') ? window.localStorage.getItem('apiKey') : null
  }

  setApiKey( apiKey ) {
    apiKey ? window.localStorage.setItem('apiKey', apiKey) : window.localStorage.removeItem('apiKey');
  }

  getUserBearer() {
    return window.localStorage.getItem('userBearer') ? window.localStorage.getItem('userBearer') : null
  }

  getUserId() {
    return window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null
  }

  getUserBearerEnding() {
    return window.localStorage.getItem('userBearerEnding') ? parseInt(window.localStorage.getItem('userBearerEnding'), 10 ) : null
  }

  getSessionId() {
    return window.localStorage.getItem('sessionId') ? window.localStorage.getItem('sessionId') : null
  }

  setUserBearer ( userBearer ) {
    userBearer ? window.localStorage.setItem('userBearer', userBearer) : window.localStorage.removeItem('userBearer')

    if ( userBearer ) {
      const bearerData = this.decodeToken( userBearer )
      window.localStorage.setItem('sessionId', bearerData.jti);
      window.localStorage.setItem('userId', bearerData.userId);
      window.localStorage.setItem('userBearerEnding', bearerData.exp + '');

    } else {
      window.localStorage.removeItem('sessionId');
      window.localStorage.removeItem('userId');
      window.localStorage.removeItem('userBearerEnding');
    }
  }

  issetApiKey() {
    const tmpApiKey = this.getApiKey()
    return tmpApiKey && tmpApiKey !== null && tmpApiKey !== 'null' && tmpApiKey !== ''
  }

  issetUserId() {
    const tmpUserId = this.getUserId()
    return tmpUserId && tmpUserId !== null && tmpUserId !== 'null' && tmpUserId !== ''
  }

  issetUserBearer() {
    const tmpUserBearer = this.getUserBearer()
    return tmpUserBearer && tmpUserBearer !== null && tmpUserBearer !== 'null' && tmpUserBearer !== ''
  }

  tokenIsValid() {
    const tmpUserBearerEnding = this.getUserBearerEnding()
    return Date.now() <= (new Date( tmpUserBearerEnding ).getTime())
  }

  needToRefreshToken() {
    const tmpUserBearerEnding = this.getUserBearerEnding()
    return Date.now() > ( (new Date( tmpUserBearerEnding ).getTime()) - this.config.timeToRefreshToken )
  }

  addNewTicket( ticket ) {
      if ( this.tickets === null ) {
        this.tickets = []
      }
      this.tickets.push( ticket )
  }

  setTicket( ticket ) {
      for ( const t in this.tickets ) {
        if ( this.tickets[t].ticketId === ticket.ticketId ) {
          this.tickets[t] = ticket
        }
      }
  }

  decodeToken (token) {
    if ( token && token !== '' ) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } else {
      return token
    }
  }

}

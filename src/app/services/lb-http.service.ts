import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, first, catchError } from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import { ConfigService } from './config.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LbHttpService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private localStorage: LocalStorageService
  ){ }


  // ----------------------- CONNEXION -----------------------

  getApiKey() {
    const url = this.config.getApiKey
    return this.http.get(url).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while getting API_KEY' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async generateHeaderForLineberty( needLinebertyAccount ) {

    if ( !this.localStorage.issetApiKey() ) {

      try {
        const res: any = await this.getApiKey().toPromise()
        this.localStorage.setApiKey( res.apiKey )

      } catch (err) {
        this.localStorage.setApiKey( '' )
      }

    }

    const headers = {
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE',
      'Access-Control-Allow-Origin': '*',
      'Content-Type':  'application/json',
    }

    const params = {
      'key': this.localStorage.getApiKey()
    }

    if ( needLinebertyAccount ) {

      try {
        await this.createOrLogUserIfNeeded()
      } catch (err) {
        console.log('Error while login the user')
        console.log( err )
      }

      headers['Authorization'] = 'Bearer ' + this.localStorage.getUserBearer()
    }

    return { headers: new HttpHeaders(headers), params: params  }
  }

  createUser() {
    const url = this.config.createUser

    return this.http.post(url, null).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while creating user' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  logUser( ) {
    const url = this.config.logUser
    const params = {userId: this.localStorage.getUserId()}

    return this.http.get(url, {params: params}).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while logging user' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  refreshToken() {
    const url = this.config.refreshToken
    const params = {userId: this.localStorage.getUserId(), sessionId: this.localStorage.getSessionId()}

    return this.http.get(url, {params: params}).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while refreshing token' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async createOrLogUserIfNeeded() {

    if ( this.localStorage.issetUserBearer() ) {

      if ( this.localStorage.tokenIsValid() ) {

        if ( this.localStorage.needToRefreshToken() ) {

          try {
            const res: any = await this.refreshToken().toPromise()
            console.log('Reshing Token res')
            console.log( res )
            this.localStorage.setUserBearer( res.jwtToken )
          } catch ( err ) {
            this.localStorage.setUserBearer( null )
          }

        }

      } else {

        try {
          const res: any = await this.logUser().toPromise()
          console.log('Res after logging user')
          console.log( res )
          this.localStorage.setUserBearer( res.jwtToken )
        } catch ( err ) {
          this.localStorage.setUserBearer( null )
        }

      }

    } else {

      try {
        const res: any = await this.createUser().toPromise()
        console.log('Res after create user')
        console.log( res )
        this.localStorage.setUserBearer( res.jwtToken )
      } catch ( err ) {
        this.localStorage.setUserBearer( null )
      }

    }
  }






  // ----------------------- DATA -----------------------


  async getPlaces() {
    const url = this.config.getPlaces
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.get(url, httpOptions).pipe(
      first(),
      tap( (places: any) => this.localStorage.places = places ),
      catchError( (error) => {
        console.log( 'Error while getting places' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async getTickets() {
    const url = this.config.getTickets
    const httpOptions = await this.generateHeaderForLineberty( true )

    return this.http.get(url, httpOptions).pipe(
      first(),
      tap( (res: any) => this.localStorage.tickets = res.tickets ),
      catchError( (error) => {
        console.log( 'Error while getting user tickets' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async getQueuesOfPlace() {
    let url = this.config.getQueuesOfPlace
    url = url.replace( '{placeId}', this.localStorage.selectedPlace.placeId )
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.get(url, httpOptions).pipe(
      first(),
      tap( (queuesOfSelectedPlace: any) => this.localStorage.queuesOfSelectedPlace = queuesOfSelectedPlace ),
      catchError( (error) => {
        console.log( 'Error while getting queues of place' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async getQueueAvailability() {
    let url = this.config.getQueueAvailability
    url = url.replace( '{queueId}', this.localStorage.selectedQueue.queueId )
    url = url.replace( '{appointmentTypeId}', this.localStorage.selectedAppointmentType.appointmentTypeId )
    url = url.replace( '{select-groupSize}', this.localStorage.selectedGroupSize + '' )
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.get(url, httpOptions).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while getting queue availability' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async bookingTicket() {
    let url = this.config.bookingTicket
    url = url.replace( '{queueId}', this.localStorage.selectedQueue.queueId )
    const body = {
      appointmentTypeId: this.localStorage.selectedAppointmentType.appointmentTypeId,
      groupSize: this.localStorage.selectedGroupSize,
      bookedFor: this.localStorage.selectedBookedFor,
      lang: 'en_US',
      userData: {
        name: '',
        phone: ''
      },
      position: {},
      source: this.config.sourceBookingTicket
    }

    const httpOptions = await this.generateHeaderForLineberty( true )

    return this.http.post(url, body, httpOptions).pipe(
      first(),
      tap( (ticket: any) => this.localStorage.addNewTicket( ticket ) ),
      catchError( (error) => {
        console.log( 'Error while booking ticket' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async cancelTicket( ticketId ) {
    let url = this.config.cancelTicket
    url = url.replace( '{ticketId}', ticketId )
    const httpOptions = await this.generateHeaderForLineberty( true )

    return this.http.put(url, {}, httpOptions).pipe(
      first(),
      tap( (ticket: any) => this.localStorage.setTicket( ticket ) ),
      catchError( (error) => {
        console.log( 'Error while cancelling ticket' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async getQueues() {
    const url = this.config.getQueues
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.get(url, httpOptions).pipe(
      first(),
      tap( (queues: any) => this.localStorage.queues = queues ),
      catchError( (error) => {
        console.log( 'Error while getting queues' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  /*

  async getQueuesState( queuesId ) {
    const url = this.config.getQueuesState
    const body = {queuesId: queuesId}
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.post(url, body, httpOptions).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while getting queuesState' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async getQueuesEligibility( queuesId ) {
    const url = this.config.getQueuesEligibility
    const body = {queuesId: queuesId}
    if ( this.localStorage.issetUserId() ) {
      body[ 'userId' ] = this.localStorage.getUserId()
    }
    const httpOptions = await this.generateHeaderForLineberty( false )

    return this.http.post(url, body, httpOptions).pipe(
      first(),
      catchError( (error) => {
        console.log( 'Error while getting queuesEligibility' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async reportTicket( ticketId ) {
    let url = this.config.reportTicket
    url = url.replace( '{ticketId}', ticketId )
    const body = { reportFor: this.localStorage.selectedBookedFor }
    const httpOptions = await this.generateHeaderForLineberty( true )

    return this.http.put(url, body, httpOptions).pipe(
      first(),
      tap( (ticket: any) => this.localStorage.setTicket( ticket ) ),
      catchError( (error) => {
        console.log( 'Error while reporting ticket' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  async rateTicket( ticketId ) {
    let url = this.config.rateTicket
    url = url.replace( '{ticketId}', ticketId )
    const body = { reportFor: this.localStorage.selectedBookedFor }
    const httpOptions = await this.generateHeaderForLineberty( true )

    return this.http.put(url, body, httpOptions).pipe(
      first(),
      tap( (ticket: any) => this.localStorage.setTicket( ticket ) ),
      catchError( (error) => {
        console.log( 'Error while rating ticket' )
        console.log(error)
        return throwError( error )
      })
    )
  }

  */

}

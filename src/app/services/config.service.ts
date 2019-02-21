import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // GLOBAL URL
  linebertyServer: string = 'https://api-booking.lineberty.net/'
  linebertyApiVersion: string = 'v1'
  yourServerUrl: string = 'http://localhost:3059/api/v1/lineberty/'

  // ROUTE ON YOUR SERVER
  getApiKey: string = this.yourServerUrl + 'apiKey'
  createUser: string = this.yourServerUrl + 'create'
  logUser: string = this.yourServerUrl + 'login'
  refreshToken: string = this.yourServerUrl + 'refreshToken'

  // ROUTE FOR LINEBERTY SERVER
  getPlaces: string = this.linebertyServer + this.linebertyApiVersion + '/places'
  getQueues: string = this.linebertyServer + this.linebertyApiVersion + '/queues'
  getTickets: string = this.linebertyServer + this.linebertyApiVersion + '/user/tickets'
  getQueuesOfPlace: string = this.linebertyServer + this.linebertyApiVersion + '/places/{placeId}/queues'
  getQueueAvailability: string = this.linebertyServer + this.linebertyApiVersion + '/queues/{queueId}/appointmentTypes/{appointmentTypeId}/groupSize/{select-groupSize}/availabilities'
  bookingTicket: string = this.linebertyServer + this.linebertyApiVersion + '/queues/{queueId}/ticket'
  cancelTicket: string = this.linebertyServer + this.linebertyApiVersion + '/user/tickets/{ticketId}/cancel'

  /*postponeTicket: string = this.linebertyServer + this.linebertyApiVersion + '/user/tickets/{ticketId}/postpone'
  getQueuesState: string = this.linebertyServer + this.linebertyApiVersion + '/queues/state'
  getQueuesEligibility: string = this.linebertyServer + this.linebertyApiVersion + '/queues/eligibility'
  rateTicket: string = this.linebertyServer + this.linebertyApiVersion + '/user/tickets/{ticketId}/rate'*/

  // CONFIG
  defaultLang: string = 'en_US'
  timeToRefreshToken: number = 1000 * 60 * 5 // 5 min
  sourceBookingTicket: string = 'WEB_APP_SDK_TEST'

}

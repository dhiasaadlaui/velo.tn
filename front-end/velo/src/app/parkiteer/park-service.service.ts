import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ParkServiceService {

  constructor(public http: HttpClient) {

    console.log('connected');
  }
  addOffer(offer: any) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    console.log(offer.email);

    return this.http.post(`http://127.0.0.1:8001/api/addoffer`, offer, {headers: header});
  }
  getOffer() {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get(`http://127.0.0.1:8001/api/afficherofferall`);
  }
  getdemandes() {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get(`http://127.0.0.1:8001/api/afficherdemandeall`);
  }
  reserverOffer(reservation, id, iduser,prix) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post('http://127.0.0.1:8001/api/addreservation/' + iduser + '/' + id +'/'+prix, reservation, {headers: header});
  }
  deleteOffer(id) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get('http://127.0.0.1:8001/api/deleteoffer/' + id);
  }
  Contatc(contact, id) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post('http://127.0.0.1:8001/api/addcontact/'  + id, contact, {headers: header});
  }
  signalerOffer(id) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get('http://127.0.0.1:8001/api/signaler/' + id);
  }
  getContacts(id) {
    // tslint:disable-next-line:prefer-const
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get('http://127.0.0.1:8001/api/listcontact/' + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReferrerService {

  constructor(private http: HttpClient) { }

  getReferrer(name: string) {
    return this.http.get(`http://localhost:8080/referrers?name=${name}`);
  }
}

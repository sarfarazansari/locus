import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ASSETS_PATH = './assets/mock-data/mock-data.json';

@Injectable({
  providedIn: 'root',
})
export class LocalService {

  constructor(
    private http: HttpClient
  ) { }

  public getMockData() {
    return this.http.get(ASSETS_PATH).toPromise();
  }
}

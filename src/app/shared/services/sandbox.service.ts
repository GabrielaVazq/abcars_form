import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SandboxService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.urlAPI}`;
  }

  getAbcars(vin:string) {
    return this.http.get(
      `${this.baseUrl}searchVehicleByVin/${vin}`
    );
  }
  postAbcars(data:any) {
    return this.http.post(
      `${this.baseUrl}Ckeckvehicles`,
      data
    );
  }
}

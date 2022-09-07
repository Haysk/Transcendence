import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../models/technology';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  getTechs() {
    return this.httpClient.get<Tech[]>(`${this.API_SERVER}/techs`);
  }

  getTech(id: number) {
    return this.httpClient.get<Tech>(`${this.API_SERVER}/tech/${id}`)
  }

  createTech(techno: Tech) {
    return this.httpClient.post<Tech>(`${this.API_SERVER}/tech`, techno);
  }

  updateTech(techno: Tech) {
    return this.httpClient.patch<Tech>(`${this.API_SERVER}/tech/${techno.id}`, techno);
  }

  removeTech(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/tech/${id}`);
  }
}

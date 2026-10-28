import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Medicine } from './medicine';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private baseUrl = environment.medicineApiUrl;
  
  constructor(private httpClient: HttpClient) { }

  getMedicinesList(): Observable<Medicine[]>{
    return this.httpClient.get<Medicine[]>(`${this.baseUrl}`);
  }

  createMedicine(medicine: Medicine): Observable<Medicine> {
    return this.httpClient.post<Medicine>(`${this.baseUrl}`, medicine);
  }

  getMedicineById(id: number): Observable<Medicine> {
    return this.httpClient.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  updateMedicine(id: number, medicine: Medicine): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, medicine);
  }

  deleteMedicine(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

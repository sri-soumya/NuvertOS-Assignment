import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompoundService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCompounds(page: number, limit: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/compounds?page=${page}&limit=${limit}`
    );
  }

  getCompound(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/compounds/${id}`);
  }

  addCompound(compound: any): Observable<any> {
    const date = new Date();
    const payload = {
      CompoundName: compound.CompoundName,
      CompoundDescription: compound.CompoundDescription,
      strImageSource: compound.strImageSource,
      strImageAttribution: compound.strImageAttribution,
      dateModified: date.toISOString(),
    };
    return this.http.post(`${this.apiUrl}/compounds`, payload);
  }

  updateCompound(id: number, compound: any): Observable<any> {
    const date = new Date();
    const payload = {
      id: compound.id,
      CompoundName: compound.CompoundName,
      CompoundDescription: compound.CompoundDescription,
      strImageSource: compound.strImageSource,
      strImageAttribution: compound.strImageAttribution,
      dateModified: date.toISOString(),
    };
    return this.http.put(`${this.apiUrl}/compounds/${id}`, payload);
  }

  deleteCompound(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/compounds/${id}`);
  }
}

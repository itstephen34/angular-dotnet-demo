import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = environment.baseUrl;
  private resources = 'Resources';
  constructor(private http: HttpClient) { }

  getResource(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl + this.resources}/${id}`);
  }

  createResource(resource: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, resource);
  }

  getResourceList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
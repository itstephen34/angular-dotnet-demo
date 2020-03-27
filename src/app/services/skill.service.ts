import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Skill {
  id?: number
  SkillName: string
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl = environment.baseUrl;
  private skillsUrl = 'Skills';
  private jesonBaseUrl = environment.jesonBaseUrl;

  constructor(private http: HttpClient) { }

  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.baseUrl + this.skillsUrl}/${id}`);
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.baseUrl + this.skillsUrl}`, skill);
  }

  getSkillList(req?: any): Observable<any> {
    const url = this.jesonBaseUrl + this.skillsUrl + this.getParamterizedUrl(req)
    return this.http.get<Skill[]>(url);
  }

  private getParamterizedUrl(body: object): string {
    let reqData = new HttpParams();
    Object.keys(body).forEach((key) => {
        reqData = reqData.set(key, body[key].toString());
    });
    return '?' + reqData.toString();
  }
}
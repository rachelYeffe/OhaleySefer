import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Enviroments/environents';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = environment.apiUrl+'/mail/send';

  constructor(private http: HttpClient) { }

  sendRegistrationForm(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }
}

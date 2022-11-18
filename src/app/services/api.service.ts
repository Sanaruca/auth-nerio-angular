import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URI = 'https://localhost:3080';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  signin(token: string){
    return this.http.post<{token: string}>(`${API_URI}/auth/token`, {
      acces_token: token
    })
  }

  loginWithGoogle(id_token: string) {
    return this.http.post<{ token: string }>(
      `${API_URI}/auth/google-id-token`,
      { id_token },
      {headers: {'Content-Type': 'application/json'}}
    );
  }

  loginWithFacebook(access_token: string) {
    return this.http.post<{ token: string }>(
      `${API_URI}/auth/facebook-token`,
      { access_token },
      {headers: {'Content-Type': 'application/json'}}
    );
  }
}

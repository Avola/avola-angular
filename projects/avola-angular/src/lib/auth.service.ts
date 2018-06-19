import { Injectable, Inject } from '@angular/core';
import { AvolaOptions } from './models/avola-options';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private oauth2_token_key = 'oauth2_accesstoken';

  constructor(@Inject('config') private config: AvolaOptions, private http: HttpClient) {
  }

  configureAuthentication() {
    this.getAccessToken().subscribe((token) => {
      localStorage.setItem(this.oauth2_token_key, JSON.stringify(token));
    });
  }

  getToken() {
    const tokenobj: AuthToken = JSON.parse(localStorage.getItem(this.oauth2_token_key));
    return tokenobj.access_token;
  }

  getAccessToken(): Observable<AuthToken> {
    let oauth2_token_endpoint = this.config.tokenHost;

    const baseHost = oauth2_token_endpoint.replace(/^https?\:\/\//i, '');

    if (!oauth2_token_endpoint.endsWith('/connect/token')) {
      oauth2_token_endpoint = oauth2_token_endpoint + '/connect/token';
    }

    const oauth2_client_id = this.config.clientId;
    const oauth2_client_secret = this.config.clientSecret;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Host-Override': baseHost
      })
    };

    const body = 'client_id={0}&client_secret={1}&grant_type=client_credentials&scope=avola-api-client'
      .replace('{0}', oauth2_client_id)
      .replace('{1}', oauth2_client_secret);

    // console.log(body);

    return this.http.post<AuthToken>(oauth2_token_endpoint, body, httpOptions);
  }
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: Array<string>;
}

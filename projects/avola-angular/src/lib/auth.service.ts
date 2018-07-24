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

  refreshToken(): Promise<AuthToken> {
    return new Promise((resolve, reject) => {
      this.getAccessTokenRequest().subscribe((token) => {
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getSeconds() + token.expires_in);
        token.expires_at = expiredAt.getTime();

        resolve(token);

        localStorage.setItem(this.oauth2_token_key, JSON.stringify(token));
      });
    });
  }

  getToken(): Promise<AuthToken> {
    return new Promise((resolve, reject) => {
      const tokenobj: AuthToken = JSON.parse(localStorage.getItem(this.oauth2_token_key));

      if ((tokenobj == null || tokenobj === undefined) || this.tokenExpired()) {
        this.refreshToken().then((newtoken) => {
          resolve(newtoken);
        });
      } else {
        resolve(tokenobj);
      }
    });
  }

  getAccessTokenRequest(): Observable<AuthToken> {
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

    return this.http.post<AuthToken>(oauth2_token_endpoint, body, httpOptions);
  }

  tokenExpired(): boolean {
    const tokenobj: AuthToken = JSON.parse(localStorage.getItem(this.oauth2_token_key));

    const now = new Date();

    return tokenobj.expires_at < now.getTime();
  }
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  scope: Array<string>;
}

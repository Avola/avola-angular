import { Injectable, Inject } from '@angular/core';
import { AvolaOptions } from './models/avola-options';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Settings } from './models/settings';
import { DecisionServiceDescription } from './models/decisionservicedescription';
import { DecisionServiceVersionDescription } from './models/decisionserviceversiondescription';
import { ApiExecutionRequest } from './models/apiexecutionrequest';
import { ExecutionResult } from './models/executionresult';
import { FreeExecutionRequest } from './models/freeexecutionrequest';

@Injectable({
  providedIn: 'root'
})
export class AvolaService {
  private baseUrl: string;

  constructor(@Inject('config') private config: AvolaOptions, private http: HttpClient, private auth: AuthService) {

    // set authentication
    this.auth.configureAuthentication();
    this.baseUrl = config.baseUrl;
  }

  /**
  * Will return the settings of the API. This describes certain endpoints
  */
  getSettings(): Observable<Settings> {
    const url: string = this.baseUrl + '/api/settings';

    return this.http.get<Settings>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Will return you the list and details of all decision services and their versions without parameters
  * With decisionServiceId: will return you the versions and details of a specific decision service.
  * Not available for free accounts
  * @param decisionServiceId
  * @param version
  */
  getDecisionServices(decisionServiceId?: number): Observable<Array<DecisionServiceDescription>> {
    let url: string;
    if (decisionServiceId) {
      url = this.baseUrl + '/api/ApiExecution/decisions/' + decisionServiceId;
    } else {
      url = this.baseUrl + '/api/ApiExecution/decisions/list';
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<Array<DecisionServiceDescription>>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
 * Will return you the details of a specific decision service version.
 * @param decisionServiceId
 * @param version
 */
  getDecisionServiceVersion(decisionServiceId: number, version: number):
    Observable<DecisionServiceVersionDescription> {
    let url: string;
    url = this.baseUrl + '/api/ApiExecution/decisions/' + decisionServiceId + '/' + version;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<DecisionServiceVersionDescription>(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Execute a descision service version, this returns all conclusions, from all decisions in the decision service
  * @param executionRequest
  */
  executeDecisionServiceVersion(executionRequest: ApiExecutionRequest): Observable<ExecutionResult> {
    let url: string;
    url = this.baseUrl + '/api/ApiExecution/execute';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ExecutionResult>(url, executionRequest, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
 * Execute a decision table. This function is only available if you are using a Free api client.
 * @param executionRequest
 */
  executeDecisionFree(freerequest: FreeExecutionRequest): Observable<ExecutionResult> {
    let url: string;
    url = this.baseUrl + '/api/FreeExecution/executedecisiontable';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<ExecutionResult>(url, freerequest, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles the error thrown by the api
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Avola Api returned code ${error.status},` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened during the request with Avola; please try again later.');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Member } from './member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private membersUrl = 'api/members';

  constructor(private http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createMember(member: Member): Observable<Member> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Member Id must be null for the Web API to assign an Id
    const newMember = { ...member, id: null };
    return this.http.post<Member>(this.membersUrl, newMember, { headers })
      .pipe(
        tap(data => console.log('createMember: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteMember(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.membersUrl}/${id}`;
    return this.http.delete<Member>(url, { headers })
      .pipe(
        tap(data => console.log('deleteMember: ' + id)),
        catchError(this.handleError)
      );
  }

  updateMember(member: Member): Observable<Member> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.membersUrl}/${member.id}`;
    return this.http.put<Member>(url, member, { headers })
      .pipe(
        tap(() => console.log('updateMember: ' + member.id)),
        // Return the member on an update
        map(() => member),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

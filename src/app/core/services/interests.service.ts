import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Interest } from '../models/interest.model';


@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  private readonly apiUrl = `/interests`;

  constructor(private readonly http: HttpService) {}

  fetchAllInterests$(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.apiUrl);
  }
}

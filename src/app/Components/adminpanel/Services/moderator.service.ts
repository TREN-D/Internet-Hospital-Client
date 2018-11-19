import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CreatingModerator } from '../../../Models/CreatingModerator';
import { HOST_URL } from '../../../config';
import { Observable } from 'rxjs';
import { ModeratorsData } from '../../../Models/ModeratorsData';

const PAGE = 'page';
const PAGE_SIZE = 'pageSize';
const SEARCH_BY_NAME = 'searchByName';
const INCLUDE_ALL = 'includeAll';
const SORT = 'sort';
const ORDER_BY = 'order';


@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  url = HOST_URL + '/api/Moderator';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getFilteredModeratorsExtended(sort: string,
                                order: string,
                                searchByName: string,
                                page: number,
                                includeAll: boolean,
                                pageSize: number): Observable<ModeratorsData> {
    const url = this.url + `?${PAGE}=${page + 1}&`
              + `${PAGE_SIZE}=${pageSize}&`
              + `${INCLUDE_ALL}=${includeAll}&`
              + `${SEARCH_BY_NAME}=${searchByName}&`
              + `${ORDER_BY}=${order}&`
              + `${SORT}=${sort}`;
    return this.http.get<ModeratorsData>(url, this.httpOptions);
  }

  postModerator(moderator: CreatingModerator) {
    const body = JSON.stringify(moderator);
    return this.http.post<CreatingModerator>(this.url, body, this.httpOptions);
  }

  deleteModerator(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  deleteModerators(ids: number[]) {
    return this.http.delete(`${this.url}/?ids=${ids.join('&ids=')}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnmEvent } from './../../models/enm-event.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';

const BASE_URL = environment.api + '/blogs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogList(): Observable<Blog[]> {
    return this.http.get<Blog[]>(BASE_URL);
  }
  
}


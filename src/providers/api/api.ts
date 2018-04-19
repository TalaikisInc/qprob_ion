import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';

import { environment } from '../../environments/environment';
import { Post } from '../../models/post.interface';
import { POSTS } from '../../mocks/post.mocks';
import { Category } from '../../models/category.interface';
import { CATEGORIES } from '../../mocks/category.mocks';

@Injectable()
export class ApiProvider {

  private baseUrl: string = environment.apiUrl;

  constructor(public http: Http) {
  }

  getPostsByCategory(categorySlug: string): Observable<Post[]> {
    return this.http.get(`${this.baseUrl}/posts/${categorySlug}/`)
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getTodayPosts(): Observable<Post[]> {
    return this.http.get(`${this.baseUrl}/today/`)
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getPost(postSlug: string): Observable<Post[]> {
    return this.http.get(`${this.baseUrl}/post/${postSlug}/`)
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(`${this.baseUrl}/cats/`)
      .do(this.logData)
      .map(this.extractData)
      .do(this.logData)
      .catch(this.handleError)
  }

  getCategory(slug: string): Observable<Category> {
    return this.getCategories()
      .map(category => category
      .filter(category => category.Slug === slug)[0])
      .catch(this.handleError)
  }

  private handleError(error: Response | any) {
    return Observable.throw(error.json().error || "Server error")
  }

  private extractData(response: Response) {
    return response.json();
  }

  private logData(response: Response) {
    console.log(response);
  }

  mockGetPost(category: string): Observable<Post[]> {
    return Observable.of(POSTS.filter(post => post.category_id.Title == category));
  }

  mockGetCategory(title: string): Observable<Category> {
    return Observable.of(CATEGORIES.filter(category => category.Title == title)[0]);
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSubject = new BehaviorSubject<boolean>(false);

  private loading: any;

  constructor() {
    this.loadingSubject.subscribe(res => {
      this.loading = res;
    });
  }

  get isLoading(): boolean {
    return this.loading;
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BlockViewService } from '../components/block-view/block-view.service';
import { AlertConfirmService } from '../components/alert-confirm/alert-confirm.service';
import { AppError, NotFoundError, BadError } from '../model/app-error';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BaseService {

  getMethod(url: string) {

    return this.next(this.http.get(url));

  }

  postMethod(url: string, obj: any) {

    return this.next(this.http.post(url, obj));

  }

  deleteMethod(url: string, id: any) {

    return this.next(this.http.delete(url + '/' + id));
  }

  putMethod(url: string, obj: any) {


    return this.next(this.http.put(url, obj));

  }

  private next(methood: any) {

    this.blockViewService.block();
    return methood.do(() => {
      this.blockViewService.unblock();
    }).catch((error: Response) => {
      this.blockViewService.unblock();

      /*const obj = {
        title: `${error.status}錯誤`,
        message: error.statusText,
      }
      this.alertConfirmService.alert(obj);*/
      this.handleError(error);
    });

  }


  constructor(
    private http: HttpClient,
    private blockViewService: BlockViewService,
    private alertConfirmService: AlertConfirmService
  ) { }


  private handleError(error: Response) {

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    if (error.status === 400) {
      return Observable.throw(new BadError(error.json()));
    }

    return Observable.throw(new AppError(error));
  }

}

/* service.getMethod(url).subscribe(
    (data) => {
      this.data = data
    },
    (error: AppError) => {
      if(error instanceof NotFoundError){
        alert('already been delete');
      }else if(error instanceof BadError){
        alert('An unexpected error occurred');
      }else {
        throw error;
      }
    }
  )
*/

/*
Observable.combineLatest([
  this.route.paramMap,
  this.route.queryParamMap
])
.switchMap(
   combined =>{
    let id = combined[0].get('id');
    let page = combined[1].get('page');
    this.service.get()
  })
.subscribe(
  resData =>{
    this.data = resData
  })
*/

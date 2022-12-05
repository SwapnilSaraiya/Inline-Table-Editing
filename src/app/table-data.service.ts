import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  toasts:any[]=[];
  url = "http://localhost:3000/user/";
  
  constructor(private _http: HttpClient) { }

  postDataApi(data:any){
    return this._http.post(this.url,data);
  }
  getDataApi(){
    return this._http.get(this.url);
  }
  updateDataApi(data:any){
    return this._http.put(this.url+data.id,data)
  }
  deleteDataApi(id:any){
    return this._http.delete(this.url+id)
  }
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    console.log({ textOrTpl, ...options })
    this.toasts.push({ textOrTpl, ...options });
  }
}

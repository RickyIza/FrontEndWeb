import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Juego } from '../Models/juego';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  url : string = "https://localhost:44303/api/Juego";

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    })
  };

  constructor(private http : HttpClient) { }
 //guarda los productos en la base de datos que vienen del componente producto form
 save( p : Juego) : Observable<any> {
  let productoBody = JSON.stringify(p);
  if(p.id === undefined){
    return this.http.post<any>(this.url, productoBody,this.httpOptions);
  }
  return this.http.put<any>(this.url, productoBody,this.httpOptions);
} 

//recupera un producto mediante un id específico que viene del component producto list
retrieve(id : number) : Observable<Juego> {
  return this.http.get<Juego>(this.url + "/" + id,this.httpOptions);
}

//elimina un producto mediante el id que recibe del component producto list
delete(p : Juego) : Observable<any> {
  return this.http.delete<any>(this.url + "/" + p.id, this.httpOptions);
}

//recupera todos los productos que se encuentran en la base de datos
list(): Observable<Juego[]>{
  return this.http.get<Juego[]>(this.url, this.httpOptions);
}

//recupera solo los productos marcados como disponibles en la base de datos
search(criteria:string): Observable<Juego[]> {
  return this.http.get<Juego[]>(this.url.concat("?criteria=").concat(criteria), this.httpOptions);
}
update(p: Juego): Observable<any>{
  const productoBody = JSON.stringify(p);
  console.log(p);
  return this.http.put<any>(this.url, p, this.httpOptions);
}
}

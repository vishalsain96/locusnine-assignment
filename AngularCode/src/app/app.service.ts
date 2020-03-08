import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient : HttpClient) { }

  public getUsers(){
    return this.httpClient.get("http://localhost:3000/getUsers");
  }

  public insertUser(data){
    return this.httpClient.post("http://localhost:3000/insertUser",{data});
  }

  public updateUser(data){
    return this.httpClient.put("http://localhost:3000/updateUser",{data});
  }

  public deleteUser(sno){
    console.log(sno);
    return this.httpClient.delete("http://localhost:3000/deleteUser/"+sno);
  }
}

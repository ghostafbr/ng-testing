import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateUserDTO, User} from "../models/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.API_URL}/api/v1/users`;
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  isAvailableEmail(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/is-available`, {email});
  }
}

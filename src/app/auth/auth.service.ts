import { Injectable } from "@angular/core";
import { NetworkService } from "../services/network.service";
import { LoginDto } from "./models/loginDto";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";

import { Plugins } from "@capacitor/core";
import { HttpClient } from "@angular/common/http";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user = null;
  public languages = [];

  constructor(
    private network: NetworkService,
    private http: HttpClient,
    private router: Router
  ) {
    Storage.get({ key: "user" }).then((user) => {
      console.log(user);
      if (user.value) {
        this.user = JSON.parse(user.value);
        this.languages = Object.keys(this.user.languages);
      }
    });
  }

  public checkEmail(email: string) {
    return this.http.post(
      "http://shinbanatabazazalogin.legaltrek.com/api/relocate",
      { email },
    ).pipe(
      map(
        (res: any) => {
          this.network.baseUrl = `https://${res.result.location}`
        }
      )
    )
  }

  public login(loginDto: LoginDto) {
    return this.network.post("/api/login", loginDto).pipe(
      tap((data) => {
        this.user = data;
        this.languages = Object.keys(this.user.languages);
        Storage.set({ key: "user", value: JSON.stringify(data) });
      })
    );
  }

  public relocate(loginDto: LoginDto) {
    return this.network.post("/api/relocate", loginDto);
  }

  public async logout() {
    this.router.navigateByUrl("/auth/login");
    await Storage.clear();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LoginDto } from "../models/loginDto";
import { Router } from "@angular/router";
import { Plugins } from "@capacitor/core";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public showPassword = false;
  public twoFactor = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toasts: ToastController
  ) {
    this.loginForm = this.fb.group({
      email: ["danail.stoqnov@gmail.com ", [Validators.required]],
      pass: ["reset$0", Validators.required],
      twoFactor: "",
    });
  }

  ngOnInit() {}

  login() {
    this.loading = true;

    if (this.twoFactor) {
      this.auth
        .twoFactorAuth({
          code: this.loginForm.get("twoFactor").value,
          return_type: "json",
          modal_email: this.loginForm.get("email").value,
        })
        .subscribe(async (res) => {
          console.log(res);
          this.loading = false;

          if (res.error) {
            const toast = await this.toasts.create({
              message: res.message,
              color: 'danger',
              duration: 3000,
              buttons: [{ text: "OK", role: "cancel" }],
            });
            await toast.present();
            return;
          }
          if (res.success) {
            this.router.navigateByUrl("/home/matters");
          }
        });
      return;
    }

    if (this.showPassword) {
      this.auth
        .login(this.loginForm.getRawValue() as LoginDto)
        .subscribe((response: any) => {
          this.loading = false;
          console.log(response);
          if (response.url == "try_code") {
            this.twoFactor = true;
            this.loginForm.get("pass").disable();
          } else {
            this.router.navigateByUrl("/home/matters");
          }
        });
    } else {
      this.auth
        .checkEmail(this.loginForm.get("email").value)
        .subscribe((response) => {
          console.log(response);
          this.loading = false;
          this.showPassword = true;
          this.loginForm.get("email").disable();
        });
    }
  }
}

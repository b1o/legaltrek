import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { LoginDto } from "../models/loginDto";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public showPassword = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["danail.stoqnov@gmail.com ", [Validators.required]],
      pass: ["reset$0", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    this.loading = true;

    if (this.showPassword) {
      this.auth
        .login(this.loginForm.value as LoginDto)
        .subscribe((response) => {
          this.loading = false;
          console.log(response);
          // this.router.navigateByUrl("/home/matters");
        });
    }

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

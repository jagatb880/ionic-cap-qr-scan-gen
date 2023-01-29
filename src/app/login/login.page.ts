import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';
import { NetworkConnectivityService } from '../network-connectivity.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})


export class LoginPage implements OnInit {
  loginData: ILoginData;
	constructor(private toastSvc: ToastService, private networkSvc: NetworkConnectivityService,
    private router: Router
	) {}

	ngOnInit() {
		this.loginData = {
      login: '',
      password: '',
    };
	}

	login() {
    if (!this.networkSvc.status) {
      if (this.loginData.login == '') {
        this.toastSvc.show({
          message: 'Enter your Email',
          type: 'error',
        });
      } else if (this.loginData.password == '') {
        this.toastSvc.show({
          message: 'Enter your Password',
          type: 'error',
        });
      } else {
        if(this.loginData.login == "test@test.com" && this.loginData.password == "8256455"){
          this.toastSvc.show({
            message: 'Successfully Login',
            type: 'success',
          });
          this.router.navigate(['/home'], {replaceUrl: true});
        }else{
          this.toastSvc.show({
            message: 'Authentication Failed',
            type: 'error',
          });
        }
      }
    } else {
      this.toastSvc.show({
        message:"",
        type: 'error',
      });
    }
  }

}

export interface ILoginData {
  login: string,
  password: string
}
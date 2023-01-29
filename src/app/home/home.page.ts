import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanActive: boolean = false;
  constructor(private router: Router) {}
  scan(){
    this.router.navigate(['/scan-qr'])
  }

  generateqr(){
    this.router.navigate(['/generate-qr'])
  }

  
}

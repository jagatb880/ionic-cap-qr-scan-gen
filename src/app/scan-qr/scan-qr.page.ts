import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  scanActive: boolean = false;
  constructor(private location: Location) {}

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.initialization();
  }

  async initialization() {
    await this.checkPermission();
    await this.startScanner();
  }

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();
      document.querySelector('body')!.classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
        this.stopScanner();
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.showBackground();
    document.querySelector('body')!.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
    this.scanActive = false;
    this.location.back();
  }


}


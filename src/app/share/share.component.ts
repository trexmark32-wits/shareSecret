import { Component, OnInit } from '@angular/core';
import { split, combine } from 'shamirs-secret-sharing-ts'


@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  constructor() {
  }
  
  secret!: string;
  share1!: string;
  share2!: string;
  shares: any;
  recovered: any;
  recovered1: any;
  hexShares: string[] = [];
  ngOnInit(): void {
  }

  createShares() {
    const secret = Buffer.from(this.secret) //secret key
    this.shares = split(secret, { shares: 5, threshold: 2 })
    this.shares.forEach((share: Uint8Array) => {
      let hex = Buffer.from(share).toString('hex');
      this.hexShares.push(hex)
    })
    console.log("hexShares", this.hexShares)
    this.recovered = combine(this.hexShares.slice(1, 3))
    console.log("recovered: ", this.recovered.toString())
  }

  getSecret() {
    this.recovered1 = combine([this.share1, this.share2]);
    console.log("recovered: ", this.recovered1.toString());
  }

}

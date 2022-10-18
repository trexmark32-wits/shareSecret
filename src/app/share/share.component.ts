import { Component, OnInit } from '@angular/core';
import { split, combine } from 'shamirs-secret-sharing-ts'
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TextDecoder } from 'util';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  constructor() {
    // (global as any).TextDecoder = TextDecoder;
  }
  secret!: string;
  share1!: string;
  share2!: string;
  shares: any;
  recovered: any;
  x = ["056dd7016d0d90037f7bd3a947c58528", "056dd7016d0d90037f7bd3a947c58528", "056dd7016d0d90037f7bd3a947c58528"]
  properShare: Uint8Array[] = [];
  ngOnInit(): void {
  }

  createShares() {
    const secret = Buffer.from(this.secret)
    this.shares = split(secret, { shares: 5, threshold: 2 })
    console.log("shares: ", this.shares)
    console.log("shares slice: ", this.shares.slice(3, 5))
    const recovered = combine(this.shares.slice(3, 5))
    console.log("recovered org: ", recovered.toString())
    console.log("--------------xxxxxx-----------------")
    this.test();
  }

  test() {
    const secret = Buffer.from(this.secret) //secret key
    this.shares = split(secret, { shares: 5, threshold: 2 })
    console.log("shares: ", this.shares)
    console.log("shares slice: ", this.shares.slice(3, 5))
    console.log("-------------------------------")
    let multi: string[][] = [];
    const sShare: Uint8Array[] = [];
    const stringShares: string[] = [];
    this.shares.forEach((share: Uint8Array) => {
      stringShares.push(share.join("//"))
      sShare.push(share)
      // console.log("Share 1:", share);
    })

    console.log("sShare", sShare);
    console.log("stringShares slice: ", stringShares.slice(3, 5))
    // stringShares.forEach(share => {
    //   this.properShare.push(Uint8Array.from(share.split("//").map(x => parseInt(x))))
    // })
    // console.log("properShare: ", this.properShare)
    console.log("stringShares slice to string: ", stringShares.slice(3, 4).toString())
    this.recovered = combine(sShare.slice(3, 5))
    // this.recovered = combine([8, 1, 50, 160, 229, 219, 11, 75, 215, 14, 38, 132, 84, 147, 233, 201, 185, 220])
    console.log("recovered: ", this.recovered.toString())
    const x = new TextDecoder().decode(
      sShare[0]
      // Uint8Array.from(this.properShare as Iterable<number>)
      // Uint8Array.from([8, 4, 11, 157, 238, 71, 227, 136, 116, 218, 111, 44, 157, 67, 57, 202, 8, 212])

    )
  }

  getSecret() {
    this.x = [];
    // this.x.push(this.shares.slice(3, 5))
    // console.log("x: ", this.share1)
    // this.recovered = combine(this.shares.slice(3, 4))
    // this.recovered = combine([this.share1, this.share2])
    // console.log(": ", this.share1)
    console.log("recovered: ", this.recovered.toString());
  }

}

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
  // properShare: Uint8Array[] = [];
  hexShares: string[] = [];
  ngOnInit(): void {
  }




  createShares() {
    // const secret = Buffer.from(this.secret)
    // this.shares = split(secret, { shares: 5, threshold: 2 })
    // console.log("shares: ", this.shares)
    // console.log("shares slice: ", this.shares.slice(3, 5))
    // const recovered = combine(this.shares.slice(3, 5))
    // console.log("recovered org: ", recovered.toString())
    // console.log("--------------xxxxxx-----------------")
    //   this.test();
    // }

    // test() {
    const secret = Buffer.from(this.secret) //secret key
    this.shares = split(secret, { shares: 5, threshold: 2 })
    // console.log("shares: ", this.shares)
    // console.log("shares slice: ", this.shares.slice(3, 5))
    // console.log("-------------------------------")
    this.shares.forEach((share: Uint8Array) => {
      let hex = Buffer.from(share).toString('hex');
      // console.log("hex", hex)
      this.hexShares.push(hex)
    })
    console.log("hexShares", this.hexShares)
    this.recovered = combine(this.hexShares.slice(1, 3))
    console.log("recovered: ", this.recovered.toString())

    // console.log("sShare", sShare);
    // console.log("stringShares slice: ", stringShares.slice(3, 5))
    // stringShares.forEach(share => {
    //   this.properShare.push(Uint8Array.from(share.split("//").map(x => parseInt(x))))
    // })
    // this.x = [];
    // var enc = new TextDecoder("utf-8");
    // this.properShare.forEach(share => {
    //   console.log("share", share.toString())
    //   // console.log("type of share", typeof share);
    //   let uint8Array = new Uint8Array(share);
    //   // let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);
    //   let hex = Buffer.from(uint8Array).toString('hex');
    //   console.log("hex", hex)
    //   this.x.push(hex);
    //   let binaryString = uint8Array;
    //   console.log("uint8Array", uint8Array)
    //   console.log("uint8Array subarray", uint8Array.subarray(1, -1))
    //   console.log("binaryString", binaryString)
    //   // console.log("type of uint8Array", typeof uint8Array);
    //   console.log("binaryString decoded", this.enc.decode(binaryString));
    //   console.log("shares encoded", this.enc.decode(uint8Array));
    //   console.log("uint8Array encoded", this.enc.decode(uint8Array).substring(1, -1));
    // })
    // console.log("properShare: ", this.properShare)
    // console.log("stringShares slice to string: ", stringShares.slice(3, 4).toString())
    // console.log("length", this.properShare.length)
    // console.log("x: ", this.x)

    // this.recovered = combine(this.hexShares.slice(1, 3))
    // this.recovered = combine(this.properShare.slice(3, 5))

    // this.recovered = combine([8, 1, 50, 160, 229, 219, 11, 75, 215, 14, 38, 132, 84, 147, 233, 201, 185, 220])
    // console.log("recovered: ", this.recovered.toString())
    // const x = new TextDecoder("utf-8").decode(
    // sShare[0]
    // Uint8Array.from(this.properShare as Iterable<number>)
    // Uint8Array.from([8, 4, 11, 157, 238, 71, 227, 136, 116, 218, 111, 44, 157, 67, 57, 202, 8, 212])
    // )
  }

  getSecret() {
    this.recovered1 = combine([this.share1, this.share2]);
    console.log("recovered: ", this.recovered1.toString());
  }

}

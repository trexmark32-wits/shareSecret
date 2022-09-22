import { Component, OnInit } from '@angular/core';
import Web3 from 'web3';
import { abi, contractAddress } from 'src/app/model/contractConsts';
import { AbiItem } from 'web3-utils';
import detectEthereumProvider from '@metamask/detect-provider';

@Component({
  selector: 'app-mint-page',
  templateUrl: './mint-page.component.html',
  styleUrls: ['./mint-page.component.scss']
})
export class MintPageComponent implements OnInit {


  contractABI!: AbiItem | AbiItem[];

  private ethPricison = 10 ** 18;
  provider: any = window.ethereum;
  private web3!: Web3;
  private accounts!: string[];
  smartContract: any;

  constructor() { }

  ngOnInit(): void {
  }

  async getAccounts() {
    await this.provider.request({ method: 'eth_requestAccounts' })
      .then((res: any) => {
        this.accounts = res;
        console.log("res", res);
        console.log("Accounts", this.accounts);
      }
      )
      .catch((err: any) => {
        alert(err.message);
      });
  }

  async minNFT() {
    let cid = this.getCID();
    if (!(typeof this.accounts !== 'undefined' && this.accounts.length > 0)) {
      await this.getAccounts();
    }
    this.connetContract();
    // console.log(post);
    this.smartContract.methods.userMint(cid).send({ from: this.accounts[0], gas: 21000 });
  }

  connetContract() {
    this.web3 = new Web3(this.provider);
    this.smartContract = new this.web3.eth.Contract(abi as AbiItem[], contractAddress);
    console.log("this.web3", this.web3);
    console.log("this.smartContract", this.smartContract);
  }

  // ** pending
  getCID() {
    let CID = "QmRCXgWrjjwhrpePDgckP4ctTqUaz63VSGrE5Ez7xFb4v7" // example CID
    // get cid for the file from pinata and return
    return CID;
  }

}


import { Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private jsEncrypt;
  private _privkey;

  constructor() {
    this.jsEncrypt = new JsEncryptModule.JSEncrypt();
  }

  decrypt(ciphertext: string): string {
    return this.jsEncrypt.decrypt(ciphertext);
  }

  set privkey(value: string) {
    this.jsEncrypt.setPrivateKey(value);

    this._privkey = value;
  }

  get privkey(): string {
    return this._privkey;
  }
}

import { Injectable } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class RsaService {
  private encrypt;
  private _privkey;

  constructor() {
    this.encrypt = new JsEncryptModule.JSEncrypt();
  }

  decrypt(ciphertext: string): string {
    return this.encrypt.decrypt(ciphertext);
  }

  set privkey(value: string) {
    this.encrypt.setPrivateKey(value);

    this._privkey = value;
  }

  get privkey(): string {
    return this._privkey;
  }
}

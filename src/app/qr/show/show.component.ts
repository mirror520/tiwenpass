import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  constructor(
    private rsaService: RsaService,
    private userService: UserService
  ) { }

  qrCodeImageUrl: Observable<SafeUrl> = this.rsaService.getGuestUserQRCode(this.currentUser.id);

  get currentUser(): User {
    return this.userService.currentUser;
  }
}

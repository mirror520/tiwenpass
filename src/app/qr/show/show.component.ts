import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/user.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  _qrCodeImageUrl = "";

  private baseUrl = environment.baseUrl;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  get qrCodeImageUrl(): string {
    return `${this.baseUrl}/api/v1/guests/${this.currentUser.id}/qr`;
  }

  get currentUser(): User {
    return this.userService.currentUser;
  }
}

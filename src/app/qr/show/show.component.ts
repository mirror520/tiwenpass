import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SafeUrl } from '@angular/platform-browser';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RsaService } from '../rsa.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/model/user';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent {
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  followerCtrl = new FormControl();
  filteredFollowers: Observable<string[]>;
  followers: string[] = [];
  allFollowers: string[] = [];

  qrCodeImageUrl: Observable<SafeUrl>;

  @ViewChild('followerInput') followerInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private rsaService: RsaService,
    private userService: UserService
  ) {
    let allFollowers = JSON.parse(localStorage.getItem("all_followers"));
    if ((allFollowers instanceof Array) && (allFollowers.length > 0))
      this.allFollowers = allFollowers;

    let followers = JSON.parse(localStorage.getItem("followers"));
    if ((followers instanceof Array) && (followers.length > 0))
      this.followers = followers;

    this.filteredFollowers = this.followerCtrl.valueChanges.pipe(
      startWith(null),
      map((follower: string | null) => {
        let filterFollowers = (follower) ? this._filter(follower) : this.allFollowers.slice();
        return filterFollowers.filter(follower => !this.followers.includes(follower));
      })
    );

    this.qrCodeImageUrl = this.rsaService.getGuestUserQRCode(this.currentUser.id, this.followers);
  }

  addFollower(follower: string) {
    if (!this.followers.includes(follower)) {
      this.followers.push(follower);
      localStorage.setItem("followers", JSON.stringify(this.followers));

      this.qrCodeImageUrl = this.rsaService.getGuestUserQRCode(this.currentUser.id, this.followers);
    }

    if (!this.allFollowers.includes(follower)) {
      this.allFollowers.push(follower);
      localStorage.setItem("all_followers", JSON.stringify(this.allFollowers));
    }
  }

  add(value: string): void {
    if ((value || '').trim()) {
      let follower = value.trim();
      this.addFollower(follower);
    }

    this.followerInput.nativeElement.value = '';
    this.followerCtrl.setValue(null);
  }

  remove(follower: string): void {
    const index = this.followers.indexOf(follower);

    if (index >= 0) {
      this.followers.splice(index, 1);
      localStorage.setItem("followers", JSON.stringify(this.followers));

      this.qrCodeImageUrl = this.rsaService.getGuestUserQRCode(this.currentUser.id, this.followers);
    }

    this.followerCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let follower = event.option.viewValue;
    this.addFollower(follower);

    this.followerInput.nativeElement.value = '';
    this.followerCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFollowers.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  logout() {
    localStorage.removeItem("account");
    localStorage.removeItem("password");
    localStorage.removeItem("phone_token");

    this.currentUser = null;
    this.router.navigate(['/']);

    this.snackBar.open(`帳號已登出`, '確定', {
      duration: 2000
    });
  }

  switchQRCodeScanner() {
    this.router.navigate(['/qr/scan']);
  }

  public set currentUser(value: User) {
    this.userService.currentUser = value;
  }
  public get currentUser(): User {
    return this.userService.currentUser;
  }

  public get qrCreatedDate(): Date {
    return this.rsaService.qrCreatedDate;
  }
}

import { Component, ElementRef, AfterViewInit } from '@angular/core';

import { RsaService } from '../qr/rsa.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements AfterViewInit {

  constructor(
    private elementRef: ElementRef,
    private rsaService: RsaService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.rsaService.todayPassColor;
  }
}

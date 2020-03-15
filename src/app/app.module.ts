import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PassComponent } from './pass/pass.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PassComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ZXingScannerModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

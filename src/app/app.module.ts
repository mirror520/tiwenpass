import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { QrModule } from './qr/qr.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { CheckUpdateBottomSheetComponent } from './check-update-bottom-sheet/check-update-bottom-sheet.component';

import { MqttModule } from 'ngx-mqtt';
import { environment, MQTT_SERVICE_OPTIONS } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CheckUpdateBottomSheetComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatListModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    QrModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

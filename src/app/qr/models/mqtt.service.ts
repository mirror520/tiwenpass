import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttConnectionState, MqttService as Mqtt } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment, MQTT_SERVICE_OPTIONS } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { Result } from '../../model/result';
import { MqttUser } from './mqtt-user';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private static _mqttUser: MqttUser;

  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private mqttService: Mqtt,
    private userService: UserService
  ) { }

  createUser(): Observable<Result<MqttUser>> {
    return this.http.get(this.baseUrl + '/api/v1/mqtt/users', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<MqttUser>) => Object.assign(new Result<MqttUser>(), value))
    );
  }

  connectMqtt(user: MqttUser): Observable<string> {
    const options: IMqttServiceOptions = MQTT_SERVICE_OPTIONS;
    options.username = `mqtt:${user.username}`;
    options.password = user.token;

    this.mqttService.connect(options);

    return this.getStatus();
  }

  subscribeTopic(topic: string): Observable<string> {
    return this.mqttService.observe(topic).pipe(
      map((message: IMqttMessage) => message.payload.toString())
    );
  }

  publishMessage(message: string, topic: string) {
    this.mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  getStatus(): Observable<string> {
    return this.mqttService.state.pipe(
      map((status: MqttConnectionState) => MqttConnectionState[status])
    );
  }

  public get mqttUser(): MqttUser {
    return MqttService._mqttUser;
  }
  public set mqttUser(value: MqttUser) {
    MqttService._mqttUser = value;
  }

  private get token(): string {
    return this.userService.currentUser.token.token;
  }
}

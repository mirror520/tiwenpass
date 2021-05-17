import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMqttMessage, IMqttServiceOptions, MqttConnectionState, MqttService as Mqtt } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment, MQTT_SERVICE_OPTIONS } from '../../environments/environment';
import { UserService } from '../user/user.service';
import { User } from '../user/model/user';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private mqttService: Mqtt,
    private userService: UserService
  ) { }

  refreshMQTTUserToken(): Observable<Result<string>> {
    return this.http.patch(this.baseUrl + '/api/v1/users/mqtt/token', null, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(
      map((value: Result<string>) => Object.assign(new Result<string>(), value))
    );
  }

  connect(user: User): Observable<string> {
    const options: IMqttServiceOptions = MQTT_SERVICE_OPTIONS;
    options.username = `mqtt:${user.username}`;
    options.password = user.token.token;

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

  private get token(): string {
    return this.userService.currentUser.token.token;
  }
}

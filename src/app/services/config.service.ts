import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { routeConfigToken } from './routeConfig.service';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(routeConfigToken) private configToken: RouteConfig) { 
    console.log(this.configToken)
  }
}

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { errorInterceptor } from './app/core/interceptors/error.interceptor';
import { tokenInterceptor } from './app/core/interceptors/token.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([errorInterceptor, tokenInterceptor])),
    importProvidersFrom(SocketIoModule.forRoot(config)),
    provideAnimations(),
  ],
});

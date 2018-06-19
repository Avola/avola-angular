import { NgModule, ModuleWithProviders } from '@angular/core';
import { AvolaAngularComponent } from './avola-angular.component';
import { AvolaService } from './avola-angular.service';
import { AvolaOptions } from './models/avola-options';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './tokeninterceptor';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [AvolaAngularComponent],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AvolaAngularModule {
  public static forRoot(config: AvolaOptions): ModuleWithProviders {
    return {
      ngModule: AvolaAngularModule,
      providers: [
        AvolaService,
        { provide: 'config', useValue: config },
        AuthService,
        { provide: 'config', useValue: config }
      ]
    };
  }
}

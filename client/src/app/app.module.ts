import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SDKBrowserModule} from "../shared/sdk/index";
import {PipesModule} from "../shared/pipes/pipes.module";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormsIonicUIModule} from "@ng2-dynamic-forms/ui-ionic";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {Http} from "@angular/http";
import {CustomErrorHandler} from "../providers/custom-error-handler/custom-error-handler";
import { FormProvider } from '../providers/form-provider/form-provider';

export function createTranslateLoader(http: Http) {
  // IDEA voir si possible d'aller chercher les traductions sur le serveur
  // IDEA pas forcément nécessaire car le service worker saura recharge les assets?
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsIonicUIModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    PipesModule,
    SDKBrowserModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    FormProvider
  ]
})
export class AppModule {}

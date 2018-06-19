# Avola Angular libraries <img src="https://angular.io/assets/images/logos/angular/angular.png" href="https://angular.io/" alt="nodejs logo" width="60" height="" />

This repo contains the project that host the avola angular libraries. At this moment avola-angular only contains the avola client. This package makes it easy to execute and synchronize your decisions. This package is meant to be used for **Angular**. If you were looking for a Javascript version, [look here]() This package is for any developer looking for an easy solution to connect Avola Decision with their software. Also check out our other tools for other languages and definitely [read our api documentation](https://docs.avo.la) if something is not clear.


# Avola Client
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/2000px-Npm-logo.svg.png" alt="npm logo" width="80" height="30" /> [![Build Status](https://travis-ci.org/Avola/avola-angular.svg?branch=master)](https://travis-ci.org/Avola/avola-angular)
## Requirements
* A valid Avola Decision account - don't have an account? Find out the very basics [by creating a free account](https://free.avo.la)
* In Avola, you need to create an API account (save the clientid and secret) - For free user check the my account page
* Your custom company endpoint ex: https://companyxyz.api.avo.la - For free user: https://free.api.avo.la
* **Very Important:** Since this angular package sends http request from the front it will throw errors for CORS, if you want to use this package send an email to: support@avo.la in order to your domain to the cors
* Your token host: you can find this at /api/settings on your custom company api endpoint - For free user it is optional and already defaults to https://free.auth.avo.la

## Installation 
```sh
npm install @avoladecision/avola-angular --save
```
**todo:**
* yarn add avola-angular
* bower install avola-angular --save

## Usage

### In your app module register the AvolaAngularModule
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AvolaAngularModule } from 'avola-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AvolaAngularModule.forRoot({
      clientId: 'replacewithyourclientid',
      clientSecret: 'replacewithyourclientsecret',
      baseUrl: 'https://free.api.avo.la or replace with your company api https://companyxyz.api.avo.la',
      tokenHost: 'https://free.auth.avo.la or replace with other avola identityserver https://login.avo.la'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
});
```

### Inject the service in a component and see this example on how to execute
```typescript
import { Component } from '@angular/core';
import { AvolaService, FreeExecutionRequest, ExecutionRequestData } from 'avola-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private avola: AvolaService) {
    const request = new FreeExecutionRequest(4);
    request.Reference = 'Testing my new decision -- ' + Date.now;
    request.ExecutionRequestData = new Array(new ExecutionRequestData(6, 'hello world'));

    avola.executeDecisionFree(request).subscribe((result) => {
      if (result.HitConclusions) {
        const finalconclusion = result.HitConclusions.find(x => x.BusinessDataId === result.FinalConclusionBusinessDataIds[0]);
        alert(`The decision '${finalconclusion.DecisionTableName}' resulted in a final conclusion: ${finalconclusion.Value}`);
      }
    });
  }
}
```

### Available methods

| name          | description   | In Free?  |
| ------------- |:-------------:| ---------:|
| getSettings()      | Will return the settings of the API. This describes certain endpoints and info. |  :white_check_mark:    |
| getDecisionServices(decisionServiceId?: number)      | Will return you the list and details of all decision services and their version without parameters. With decisionServiceId: will return you the versions and details of a specific decision service.      |        |
| getDecisionServiceVersions(decisionServiceId: number, version: number) | Will return you the details of a specific decision service version.      |        |
| executeDecisionServiceVersion(executionRequest: Execution.ApiExecutionRequest)      | Execute a descision service version, this returns all conclusions, from all decisions in the decision service. |      |
| executeDecisionFree(freerequest: Execution.FreeExecutionRequest)      | Execute a decision. This function is only available if you are a Free user and doesn't support the full power of versioned execution. |  :white_check_mark:    |


# Contribute to avola angular libraries :star: :star: :star:
Want to contribute to a library or run it local?
1) Clone the repo

2) Install dependencies
```sh
npm install
```

3) Follow instructions
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. You can test the libraries here.

## Code scaffolding

Run `ng generate component component-name` to generate a new component to test with. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build + create a new library

Run `ng build avola-angular` to build a specific library. Libraries are located in the projects folder. Run `ng generate library my-lib` to create a new one 
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
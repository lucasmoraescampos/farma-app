// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false,

  apiUrl: 'http://localhost:8000',

  mercadopago: {
    publicKey: 'TEST-b01bd26b-0810-457b-8187-54db697eb8eb',
    // publicKey: 'APP_USR-a157c6fd-6b03-4533-876a-6b4b42e11d97'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

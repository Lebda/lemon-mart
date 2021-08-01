// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBj1aPR51iFkdCYOb7cS6azMa2dJBE8FR0',
    authDomain: 'lemon-mart-a3f9f.firebaseapp.com',
    projectId: 'lemon-mart-a3f9f',
    storageBucket: 'lemon-mart-a3f9f.appspot.com',
    messagingSenderId: '643233863318',
    appId: '1:643233863318:web:8cc243eab7f7d454a0d4b7',
    measurementId: 'G-58N2E2ESKC',
  },
  authMode: AuthMode.InMemory,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

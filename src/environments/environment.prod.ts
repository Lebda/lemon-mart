import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyBj1aPR51iFkdCYOb7cS6azMa2dJBE8FR0',
    authDomain: 'lemon-mart-a3f9f.firebaseapp.com',
    projectId: 'lemon-mart-a3f9f',
    storageBucket: 'lemon-mart-a3f9f.appspot.com',
    messagingSenderId: '643233863318',
    appId: '1:643233863318:web:8cc243eab7f7d454a0d4b7',
    measurementId: 'G-58N2E2ESKC',
  },
  authMode: AuthMode.Firebase,
};

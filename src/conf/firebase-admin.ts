
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { serviceAccount } from './service-account';
import { firebaseConfig } from './firebase';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: firebaseConfig.databaseURL,
  });
}

export const adminAuth = getAuth();

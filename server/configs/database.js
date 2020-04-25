import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccounts/react-login.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default db;

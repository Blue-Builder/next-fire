import * as admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FIREBSE_TYPE,
      project_id: process.env.FIREBSE_PROJECT_ID,
      private_key_id: process.env.FIREBSE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBSE_PRIVATE_KEY,
      client_email: process.env.FIREBSE_CLIENT_EMAIL,
      client_id: process.env.FIREBSE_CLIENT_ID,
      auth_uri: process.env.FIREBSE_AUTH_URI,
      token_uri: process.env.FIREBSE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBSE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBSE_CLIENT_X509_CERT_URL
    }),
    databaseURL: 'https://next-fire.firebaseio.com'
  })
}

export const adminFirestore = admin.firestore()
export const adminStorage = admin.storage()

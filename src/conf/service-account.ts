import env from './dev.env';

export const serviceAccount = {
  type: env.serviceAccount.type,
  projectId: env.firebase.projectId,
  privateKeyId: env.serviceAccount.privateKeyId,
  privateKey: env.serviceAccount.privateKey,
  clientEmail: env.serviceAccount.clientEmail,
  clientId: env.serviceAccount.clientId,
  authUri: env.serviceAccount.authUri,
  tokenUri: env.serviceAccount.tokenUri,
  authProviderX509CertUrl: env.serviceAccount.authProviderX509CertUrl,
  clientC509CertUrl: env.serviceAccount.clientC509CertUrl,
  universeDomain: env.serviceAccount.universeDomain,
};

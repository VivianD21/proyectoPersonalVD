// src/services/auth0.js
import { createAuth0Client } from '@auth0/auth0-spa-js'

let auth0 = null

export async function initAuth0({ domain, clientId, redirectUri = window.location.origin } = {}) {
  if (!auth0) {
    auth0 = await createAuth0Client({
      domain,
      client_id: clientId,
      redirect_uri: redirectUri
    })
  }
  return auth0
}

export function getAuth0() {
  if (!auth0) throw new Error('Auth0 no inicializado')
  return auth0
}

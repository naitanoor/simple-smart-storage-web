// eslint-disable-next-line no-redeclare
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

// eslint-disable-next-line import/prefer-default-export
export function isLocalhost() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return true;
  }
  return false;
}

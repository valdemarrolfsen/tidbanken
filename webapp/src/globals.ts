//
// ===== File globals.ts
//

'use strict';

/*
 * ============= BASE URL =============
 */

export var baseURL: string;

/*
 * ============= API URL =============
 */

export var apiUrl: string;


/*
 * ============= Checks ENV ==============
 */

if ('development' === ENV) {
  baseURL = 'http://localhost:8000';
  apiUrl = baseURL + '/';

} else {
  baseURL = 'https://beta.mojob.io';
  apiUrl = baseURL + '/';
}

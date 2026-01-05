/**
 * Application routes with its version
 * https://github.com/Sairyss/backend-best-practices#api-versioning
 */

// Sandboxes
const sandboxes = 'sandboxes';

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  sandbox: {
    find: sandboxes,
    create: sandboxes,
  },
};

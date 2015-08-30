/**
 * This is a common module shared by server and client.
 * Don't put secret token, hash salt or passwords in this file
 */

module.exports = {
  installedApps: {
    core: {
      pathPrefix: '',
    },
    user: {
      pathPrefix: '/user',
    },
    todo: {
      pathPrefix: '/todo',
    },
  },
};
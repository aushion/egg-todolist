'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.resources('home', '/todolist', controller.home);
  // router.get('/todolist', controller.home.get);

};

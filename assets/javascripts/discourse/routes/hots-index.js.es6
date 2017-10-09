import { ajax } from 'discourse/lib/ajax';
export default Discourse.Route.extend({
  model(opts) {
  	return ajax("/hots");
  },

  setupController(controller, model) {
    controller.setProperties({ model });
  }
});

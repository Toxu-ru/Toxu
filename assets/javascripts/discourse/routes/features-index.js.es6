import { ajax } from 'discourse/lib/ajax';
export default Discourse.Route.extend({
  model(opts) {
  	return ajax("/features");
  },

      titleToken() {
    return "Возможности сайта";
},
  
  setupController(controller, model) {
    controller.setProperties({ model });
  }
});

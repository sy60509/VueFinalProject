// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios'; //主要AJAX套件
import VueAxios from 'vue-axios'; //將他轉為VUE的套件
import router from './router';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import VeeValidate from 'vee-validate';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueMaterial);


Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
/* eslint-disable no-new */
new Vue({
	el: '#app',
	components: { App },
	template: '<App/>',
	router
});

router.beforeEach((to, from, next) => {
	console.log('to', to, 'from', from, 'next', next);

	if (to.meta.requiresAuth) {
		const api = `${process.env.API_PATH}/api/user/check`;
		axios.post(api).then((response) => {
			console.log(response.data);
			if (response.data.success) {
				next();
			} else {
				next({
					path: '/login'
				});
			}
		});
	} else {
		next();
	}
});

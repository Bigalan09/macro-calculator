import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const Home = {
	template: '<div>home</div>'
};
const Foo = {
	template: '<div>foo</div>'
};
const Bar = {
	template: '<div>bar</div>'
};

import Base from './components/Base.vue';


const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [{
			path: '/',
			component: Base
		},
		{
			path: '/test1',
			component: Base
		},
		{
			path: '/test2',
			component: Base
		}
	]
});

new Vue({
	router,
	el: '#vue-app',
	template: '<App/>',
	components: {
		App
	}
});
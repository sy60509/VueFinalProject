import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';
import Coupons from '@/components/pages/Coupons';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Home from '@/components/pages/home';
import ShoppingCart from '@/components/pages/ShoppingCart';
import PaymentData from '@/components/pages/PaymentData';
Vue.use(Router);

export default new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '*',
			redirect: 'login'
		},

		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/home',
			name: 'Home',
			component: Home
		},
		{
			path: '/shoppingcart',
			name: 'ShoppingCart',
			component: ShoppingCart
		},
		{
			path: '/paymentData',
			name: 'PaymentData',
			component: PaymentData
		},

		{
			path: '/admin',
			name: 'Dashboard',
			component: Dashboard,
			meta: { requiresAuth: true },
			children: [
				{
					path: 'products',
					name: 'Products',
					component: Products
				},
				{
					path: 'coupons',
					name: 'Coupons',
					component: Coupons,
					meta: { requiresAuth: true }
				},
				{
					path: 'orders',
					name: 'Orders',
					component: Orders,
					meta: { requiresAuth: true }
				}
			]
		},

		{
			path: '/admin',
			name: 'Dashboard',
			component: Dashboard,
			children: [
				{
					path: 'customer_order',
					name: 'CustomerOrder',
					component: CustomerOrder
				},
				{
					path: 'customer_checkout:/:orderId',
					name: 'CustomerCheckout',
					component: CustomerCheckout
				}
			]
		}
	]
});

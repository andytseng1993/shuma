import Vue from 'vue'
import VueRouter from 'vue-router'
import Contact from '../views/Contact/index.vue'
import placeOrder from '../views/PlaceOrder/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/artwork',
    name: 'Artwork',
    component: () => import(/* webpackChunkName: "artwork" */ '../views/Artwork/index.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/Shop/index.vue')
  },
  {
    path: '/place-order',
    name: 'placeOrder',
    component: placeOrder
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/*',
    redirect: { name: 'Home' }

  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView()
  }
})

export default router

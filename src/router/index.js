import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import(/* webpackChunkName: "place-order" */ '../views/PlaceOrder/index.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact/index.vue')
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

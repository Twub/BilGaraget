import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forum from '../views/Forum.vue'
import Thread from '../views/Thread.vue'
import CreateThread from '../views/CreateThread.vue'
import CreateAccountView from '../views/CreateAccountView'
import MyPageView from '../views/MyPageView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/forum',
    name: 'forum',
    component: Forum,
    props: true
  },
  {
    path: '/forum/thread',
    name: 'thread',
    component: Thread,
    props: true
  },
  {
    path: '/forum/create-thread',
    name: 'create-thread',
    component: CreateThread,
    props: true
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: CreateAccountView,
    props: false
  },
  {
    path: '/my-page',
    name: 'my-page',
    component: MyPageView,
    props: false
  }
]

const router = new VueRouter({
  routes
})

export default router

// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterView.vue'
import SignIn from '../views/SignInView.vue'

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const auth = getAuth(); // Firebase Authを取得
      onAuthStateChanged(auth, user => {
        if (user) {
          console.log(user);
          next();
        } else {
          next("/signin");
        }
      });
  }},
  {
    path: '/about',
    name: 'about',
    // 動的インポートによる遅延読み込み
    component: AboutView
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/signin",
    name: "signIn",
    component: SignIn
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router

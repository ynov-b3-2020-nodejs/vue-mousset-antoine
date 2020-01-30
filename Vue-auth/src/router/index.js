
import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line no-unused-vars,import/extensions
import HelloWorld from '../components/HelloWorld';
// eslint-disable-next-line import/extensions
import Login from '../components/Login';
// eslint-disable-next-line import/extensions
import Register from '../components/Register';
// eslint-disable-next-line import/extensions
import UserBoard from '../components/UserBoard';
// eslint-disable-next-line import/extensions
import Admin from '../components/Admin';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        guest: true,
      },
    },
    {
      path: '/dashboard',
      name: 'userboard',
      component: UserBoard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        is_admin: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next();
        } else {
          next({ name: 'userboard' });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next();
    } else {
      next({ name: 'userboard' });
    }
  } else {
    next();
  }
});

export default router;

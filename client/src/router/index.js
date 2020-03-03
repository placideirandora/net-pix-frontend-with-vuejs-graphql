import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import AddPost from '../components/Posts/AddPost.vue';
import Posts from '../components/Posts/Posts.vue';
import Profile from '../components/Auth/Profile.vue';
import SignIn from '../components/Auth/SignIn.vue';
import SignUp from '../components/Auth/SignUp.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/posts/add',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;

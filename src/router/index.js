import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import SlackUserDetail from '@/components/slack_users/UserDetail';
import NotFoundComponent from '@/components/NotFoundComponent';
import SignUp from '@/components/authentication/SignUp';
import SignIn from '@/components/authentication/SignIn';
import Admin from '@/components/admin/Admin';
import UserDetail from '@/components/admin/UserDetail';
import UnverifiedUsers from '@/components/admin/UnverifiedUsers';
import AllUserList from '@/components/slack_users/AllUserList';
import LoadUsersSlack from '@/components/admin/LoadUsersSlack';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // Need a fallback 404 path when using 'history' mode for the router.
    {
      path: '*',
      component: NotFoundComponent
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/unauth/signup',
      component: SignUp
    },
    {
      path: '/unauth/signin',
      component: SignIn
    },
    {
      path: '/user/:id',
      name: 'User',
      component: SlackUserDetail
    },
    {
      path: '/all-users',
      name: 'All User List',
      component: AllUserList
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/admin/user/:id',
      name: 'Admin User',
      component: UserDetail
    },
    {
      path: '/admin/unverified-users',
      name: 'Unverified Users',
      component: UnverifiedUsers
    },
    {
      path: '/admin/load-users-slack',
      name: 'Load Users from Slack',
      component: LoadUsersSlack
    }
  ]
});

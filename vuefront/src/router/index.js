import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// I get an error when the file name starts with a Capital letter for some reason
// Fix restart the server ........
import Sandbox from '../views/Sandbox.vue';
import GitHubAPISearch from '../views/GitHubAPISearch.vue';
import TodoApp from '../views/TodoApp.vue';
Vue.use(VueRouter);
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
        path: '/sandbox',
        name: 'Sandbox',
        component: Sandbox
        //component: () => import(/* webpackChunkName: "about" */ '../views/Sandbox.vue'),
    },
    {
        path: '/githubsearch',
        name: 'GitHubAPISearch',
        component: GitHubAPISearch
    },
    {
        path: '/todoApp',
        name: 'TodoApp',
        component: TodoApp
    },
];
const router = new VueRouter({
    routes
});
export default router;
//# sourceMappingURL=index.js.map
const routes = [
    {
        path: "/",
        redirect: '/login', //路由懒加载
    },
    {
        path: "/login",
        component: () => import("@/pages/login.vue"), //路由懒加载
    },
    {
        path: "/layout",
        component: () => import("@/layout/layout.vue"),
        children:
        [
            {
                path: "/home",
                component: () => import("@/pages/home.vue"),
            },
            {
                path: "/communication",
                component: () => import("@/pages/communication.vue"),
            }
        ]
    },
];

export default routes;
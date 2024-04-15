import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';
import ManageReportsView from '../views/ManageReportsView.vue';
import ReportsView from '../views/ReportsView.vue';

const data = {};

const routes = [
    {
        label: 'Login',
        path: '/login',
        component: LoginView,
        meta: { requiresAuth: false }
    },
    {
        label: 'Dashboard',
        path: '/dashboard',
        component: DashboardView,
        meta: { requiresAuth: true }
    },
    {
        label: 'Reports',
        path: '/reports',
        component: ReportsView,
        meta: { requiresAuth: true, requiresPermission: 'view_reports' }
    },
    {
        label: 'Manage Reports',
        path: '/manage-reports',
        component: ManageReportsView,
        meta: { requiresAuth: true, requiresPermission: 'manage_reports' }
    },
    // 其他路由...
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    console.log(requiresAuth)
    const requiresPermission = to.meta.requiresPermission;
    console.log(requiresPermission)

    if (requiresAuth && !isLoggedIn()) {
        next('/login');
    } else if (requiresPermission && !hasPermission(requiresPermission)) {
        next('/'); // 或者跳轉其他頁面
    } else {
        next();
    }
});

function isLoggedIn() {
    // 用戶是否已登入
    return data.user && data.user.name;
}

function hasPermission(requiredPermission) {
    console.log(requiredPermission)
    console.log(data.user.userPermissions.includes(requiredPermission))

    // 檢查用戶是否有權限
    return data.user.userPermissions.includes(requiredPermission);
}

export default router;
export function generateMenu(user) {
    // 模擬 Vuex
    data.user = user;

    return routes.filter(route => {
        if (route.label === 'Login')
            return false;

        const { requiresPermission } = route.meta;

        if (requiresPermission) {
            return user.userPermissions.includes(requiresPermission);
        }
        return true;
    });
}
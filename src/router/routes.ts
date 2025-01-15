import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        redirect: { name: 'dashboard' },
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                meta: {
                    label: 'Dashboard',
                    icon: 'ri:dashboard-line',
                    activeIcon: 'ri:dashboard-fill',
                    separate: true,
                },
                component: () => import('pages/Index.vue'),
            },
            {
                path: 'albums',
                name: 'albums',
                meta: {
                    label: 'Albums',
                    icon: 'ri:album-line',
                    activeIcon: 'ri:album-fill',
                    group: 'Music',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'songs',
                name: 'songs',
                meta: {
                    label: 'Songs',
                    icon: 'ri:music-2-line',
                    activeIcon: 'ri:music-2-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'artists',
                name: 'artists',
                meta: {
                    label: 'Artists',
                    icon: 'ri:group-line',
                    activeIcon: 'ri:group-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'playlist',
                name: 'playlist',
                meta: {
                    label: 'Playlist',
                    icon: 'ri:play-list-line',
                    activeIcon: 'ri:play-list-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'library',
                name: 'library',
                meta: {
                    label: 'Library',
                    icon: 'ri:folder-music-line',
                    activeIcon: 'ri:folder-music-fill',
                    separate: true,
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'pie',
                name: 'pie',
                meta: {
                    label: 'Pie Chart',
                    icon: 'ri:pie-chart-2-line',
                    activeIcon: 'ri:pie-chart-2-fill',
                    group: 'Charts',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'line',
                name: 'line',
                meta: {
                    label: 'Line Chart',
                    icon: 'ri:line-chart-line',
                    activeIcon: 'ri:line-chart-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'bar',
                name: 'bar',
                meta: {
                    label: 'Bar Chart',
                    icon: 'ri:bar-chart-2-line',
                    activeIcon: 'ri:bar-chart-2-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'bubble',
                name: 'bubble',
                meta: {
                    label: 'Bubble Chart',
                    icon: 'ri:bubble-chart-line',
                    activeIcon: 'ri:bubble-chart-fill',
                    separate: true,
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'typewriter',
                name: 'typewriter',
                meta: {
                    label: 'Typewriter',
                    icon: 'ri:keyboard-line',
                    activeIcon: 'ri:keyboard-fill',
                    group: 'Apps',
                },
                component: () => import('pages/Typewriter.vue'),
            },
            {
                path: 'experimental',
                name: 'experimental',
                meta: {
                    label: 'Experimental',
                    icon: 'ri:test-tube-line rotate-45',
                    activeIcon: 'ri:test-tube-fill rotate-45',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
            {
                path: 'utils',
                name: 'utils',
                meta: {
                    label: 'Utils',
                    icon: 'ri:tools-line',
                    activeIcon: 'ri:tools-fill',
                    separate: true,
                },
                children: [
                    {
                        path: 'cropper',
                        name: 'cropper',
                        meta: {
                            label: 'Cropper',
                            icon: 'ri:crop-line',
                            activeIcon: 'ri:crop-fill',
                        },
                        component: () => import('pages/CropperPage.vue'),
                    },
                    {
                        path: 'markdown',
                        name: 'markdown',
                        meta: {
                            label: 'Markdown',
                            icon: 'ri:markdown-line',
                            activeIcon: 'ri:markdown-fill',
                        },
                        component: () => import('pages/common/EmptyPage.vue'),
                    },
                ],
            },
            {
                path: 'personal',
                name: 'personal',
                meta: {
                    label: 'Personal',
                    icon: 'ri:user-settings-line',
                    activeIcon: 'ri:user-settings-fill',
                    group: 'Settings',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },

            {
                path: 'settings',
                name: 'settings',
                meta: {
                    label: 'Settings',
                    icon: 'ri:settings-5-line',
                    activeIcon: 'ri:settings-5-fill',
                },
                component: () => import('pages/common/EmptyPage.vue'),
            },
        ],
    },
    {
        path: '/auth',
        name: 'auth',
        redirect: { name: 'login' },
        component: () => import('layouts/AuthLayout.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('pages/auth/Login.vue'),
            },
            {
                path: 'signup',
                name: 'signup',
                component: () => import('pages/auth/Signup.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/common/404.vue'),
    },
];

export default routes;

import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        redirect: { name: 'gallery' },
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: 'gallery',
                name: 'gallery',
                meta: {
                    label: 'Gallery',
                    icon: 'ri:gallery-line',
                    activeIcon: 'ri:gallery-fill',
                    separate: true,
                },
                component: () => import('pages/Gallery.vue'),
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
                component: () => import('pages/Markdown.vue'),
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

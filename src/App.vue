<template>
    <router-view />
</template>

<script setup lang="ts">
import useDarkStore from '@/stores/dark';

import { onMounted } from 'vue';
import useViewsStore from 'src/stores/views';
import customIconSet from 'src/assets/icon-set';
const { initDarkMode } = useDarkStore();
const { initLeftDrawerOpen } = useViewsStore();
onMounted(() => {
    initDarkMode(false);
    initLeftDrawerOpen(true);
});

import { useQuasar } from 'quasar';
const $q = useQuasar();

$q.iconMapFn = (iconName) => {
    // icon里可以写其他类名(旋转/翻转之类)
    if (iconName.startsWith('ri:')) {
        return { cls: iconName + ' i' };
    }
    if (iconName.startsWith('eva-')) {
        return { cls: iconName + ' eva' };
    }
    if (iconName.startsWith('mdi-')) {
        return { cls: iconName + ' mdi' };
    }
};
$q.iconSet.set(customIconSet);
</script>

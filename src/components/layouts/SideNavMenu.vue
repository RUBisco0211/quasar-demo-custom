<template>
    <q-list>
        <SideNavMenuItem v-for="(item, i) in items" :key="i" v-bind="item">
            <template #tooltip>
                <q-tooltip
                    transition-show="scale"
                    transition-hide="scale"
                    v-if="mini"
                    anchor="center left"
                    self="center right"
                    >{{ item.meta?.label }}</q-tooltip
                >
            </template>
        </SideNavMenuItem>
    </q-list>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import SideNavMenuItem from './SideNavMenuItem.vue';
import { useRouter } from 'vue-router';
defineProps<{ mini: boolean }>();

const router = useRouter();
const items = computed(() => {
    return router.currentRoute.value.matched[0].children;
});
</script>

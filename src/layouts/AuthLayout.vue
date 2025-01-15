<template>
    <q-layout class="full-screen" :class="globalClass">
        <div class="absolute-center">
            <router-view v-slot="{ Component }">
                <transition
                    appear
                    enter-active-class="animated fadeInRight"
                    leave-active-class="animated fadeOutRight"
                    :duration="{ enter: 300, leave: 300 }"
                    mode="out-in"
                >
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </q-layout>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed } from 'vue';
const $q = useQuasar();
const globalClass = computed(() => {
    return $q.dark.isActive
        ? 'bg-dark-page text-light'
        : 'bg-light-page text-dark';
});
</script>

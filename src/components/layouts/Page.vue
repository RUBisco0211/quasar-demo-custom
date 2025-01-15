<template>
    <q-page :style-fn="pageStyleFunc">
        <q-scroll-area style="height: 100%" ref="scrollAreaRef">
            <div class="row justify-center" v-if="colClass">
                <div :class="colClass">
                    <slot></slot>
                </div>
            </div>
            <slot v-else></slot>
        </q-scroll-area>
        <slot name="page-sticky"> </slot>
        <slot name="page-scroller"></slot>
    </q-page>
</template>
<script setup lang="ts">
defineProps<{ colClass?: string; noFooter?: boolean }>();
import { VNode, ref } from 'vue';

defineSlots<{
    default: () => VNode[];
    'page-sticky': () => VNode[];
    'page-scroller': () => VNode[];
}>();

const pageStyleFunc = (offset: number) => {
    return { height: offset ? `calc(100vh - ${offset}px)` : '100vh' };
};

const scrollAreaRef = ref();

defineExpose({ scrollAreaRef });
</script>

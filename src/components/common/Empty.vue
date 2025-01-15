import { VNode } from 'vue';
<template>
    <transition
        appear
        :duration="transitionDuration"
        :enter-active-class="`animated ${transitionShow}`"
        :leave-active-class="`animated ${transitionHide}`"
    >
        <Result
            v-if="show"
            type="empty"
            :label="props.label"
            :icon="props.icon"
        >
            <template #actions>
                <slot />
            </template>
        </Result>
    </transition>
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        show?: boolean;
        icon?: string;
        label?: string;
        transitionShow?: string;
        transitionHide?: string;
        transitionDuration?: number;
    }>(),
    {
        icon: 'ri:inbox-2-line',
        label: '暂无数据',
        show: false,
        transitionShow: 'fadeIn',
        transitionHide: 'fadeOut',
        transitionDuration: 300,
    }
);
</script>

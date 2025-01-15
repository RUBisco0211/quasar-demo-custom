<template>
    <q-btn
        flat
        :round="props.round"
        :rounded="!props.round"
        :icon="props.icon"
        :color="props.color"
        :disable="props.disabled"
        @click.stop="throttleClick($event)"
    >
        <slot></slot>
        <q-badge
            :label="badge"
            v-if="badge !== undefined"
            floating
            color="negative"
            rounded
        ></q-badge>
        <q-tooltip :delay="tooltipDelay" v-if="props.tooltip">{{
            props.tooltip
        }}</q-tooltip>
    </q-btn>
</template>
<script setup lang="ts">
import {} from 'vue';
import { throttle as throttleFn } from 'quasar';
const props = withDefaults(
    defineProps<{
        icon?: string;
        color?: string;
        round?: boolean;
        tooltip?: string;
        disabled?: boolean;
        throttle?: number;
        tooltipDelay?: number;
        badge?: string | number; // 角标
    }>(),
    {
        round: false,
        throttle: 0,
        tooltipDelay: 300,
    }
);

const emits = defineEmits<{ (e: 'click', ev?: Event): void }>();

const throttleClick = throttleFn(async (ev: Event) => {
    emits('click', ev);
}, props.throttle);
</script>

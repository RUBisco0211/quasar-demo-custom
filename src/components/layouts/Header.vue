<template>
    <q-header v-bind="props">
        <q-toolbar>
            <slot name="left"></slot>
            <q-space></q-space>
            <slot name="center"></slot>
            <q-space></q-space>
            <slot name="right"></slot>
        </q-toolbar>
    </q-header>
</template>
<script setup lang="ts">
import { QHeaderProps } from 'quasar';
import { VNode } from 'vue';

const props = withDefaults(defineProps<QHeaderProps>(), {
    elevated: false,
    reveal: false,
    modelValue: true,
});
defineSlots<{
    left: () => VNode[];
    center: () => VNode[];
    right: () => VNode[];
}>();
</script>

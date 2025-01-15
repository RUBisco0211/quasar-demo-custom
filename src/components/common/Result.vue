<template>
    <q-card-section class="text-center q-py-xl" style="width: 100%">
        <q-icon
            size="80px"
            :color="icon.color"
            :name="icon.name"
            v-if="!slots.icon"
        >
        </q-icon>
        <slot name="icon" v-else></slot>
        <div class="text-h5 text-center q-mt-lg q-mb-md">
            {{ props.label }}
        </div>
        <div class="text-body1 text-grey text-center">
            {{ props.caption }}
        </div>
        <div class="q-my-md">
            <slot name="actions"></slot>
        </div>
    </q-card-section>
</template>
<script setup lang="ts">
import { computed, VNode } from 'vue';

const props = withDefaults(
    defineProps<{
        type?:
            | 'success'
            | 'multi-success'
            | 'error'
            | 'warning'
            | 'info'
            | 'empty';
        icon?: string;
        color?: string;
        label?: string;
        caption?: string;
    }>(),
    {
        type: 'success',
    }
);

const slots = defineSlots<{ icon?: () => VNode[]; actions?: () => VNode[] }>();

const icon = computed(() => {
    switch (props.type) {
        case 'success':
            return { color: 'positive', name: 'ri:check-line' };
        case 'multi-success':
            return { color: 'positive', name: 'ri:check-double-line' };
        case 'error':
            return { color: 'negative', name: 'ri:close-circle-fill' };
        case 'warning':
            return { color: 'warning', name: 'ri:alert-fill' };
        case 'info':
            return { color: 'primary', name: 'ri:information-2-fill' };
        case 'empty':
            return { color: 'primary', name: 'ri:archive-stack-line' };
        default:
            return {
                color: props.color || undefined,
                name: props.icon || undefined,
            };
    }
});
</script>

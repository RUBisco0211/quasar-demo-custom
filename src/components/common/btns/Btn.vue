<template>
    <q-btn
        v-bind="props"
        unelevated
        class="q-py-sm"
        v-ripple
        :class="{ 'btn-plain': plain }"
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
    </q-btn>
</template>
<script setup lang="ts">
import { getCssVar, QBtnProps, colors, throttle as throttleFn } from 'quasar';
import { computed } from 'vue';
const { hexToRgb } = colors;

const props = withDefaults(
    defineProps<
        Omit<QBtnProps, 'onClick'> & {
            throttle?: number; // 节流时间，毫秒
            plain?: boolean; // 半透明风格
            badge?: string | number; // 角标
        }
    >(),
    {
        color: 'primary',
        disabled: false,
        plain: false,
        throttle: 0,
    }
);

const emits = defineEmits<{ (e: 'click', ev?: Event): void }>();

const throttleClick = throttleFn(async (ev: Event) => {
    emits('click', ev);
}, props.throttle);

const plainBgColor = computed(() => {
    const { r, g, b } = hexToRgb(getCssVar(props.color)!);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
});
const plainTextColor = computed(() => {
    return getCssVar(props.color);
});
</script>
<style lang="scss" scoped>
.btn-plain {
    background: v-bind(plainBgColor) !important;
    color: v-bind(plainTextColor) !important;
}
</style>

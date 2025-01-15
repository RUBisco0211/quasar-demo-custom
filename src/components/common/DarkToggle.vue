<template>
    <q-toggle
        :model-value="$q.dark.isActive"
        @update:model-value="(value, event) => handleToggle(event)"
        checked-icon="ri:moon-line"
        unchecked-icon="ri:sun-line"
        :color="color"
    >
        <q-tooltip transition-show="scale" transition-hide="scale">
            切换夜间模式
        </q-tooltip>
    </q-toggle>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import useDark from 'src/stores/dark';
const $q = useQuasar();
const { handleToggle } = useDark();
withDefaults(
    defineProps<{
        color?: string;
    }>(),
    {
        color: 'primary',
    }
);
</script>

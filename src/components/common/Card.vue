<template>
    <q-card
        :flat="flat"
        :bordered="bordered"
        v-ripple="clickable"
        :class="{ 'cursor-pointer': clickable }"
    >
        <slot name="default"></slot>
        <q-inner-loading
            :showing="loading"
            transition-show="fade"
            transition-hide="fade"
            :label="loadingLabel"
        >
        </q-inner-loading>
    </q-card>
</template>
<script setup lang="ts">
import {} from 'vue';
import { QCard, QCardProps } from 'quasar';
withDefaults(
    defineProps<
        {
            loading?: boolean;
            loadingLabel?: string;
            clickable?: boolean;
        } & QCardProps
    >(),
    {
        flat: true,
        loading: false,
        loadingLabel: '加载中...',
        clickable: false,
    }
);
</script>

<template>
    <q-item v-if="!logoOnly && !nameOnly">
        <q-item-section avatar>
            <q-avatar size="lg">
                <q-img :ratio="1 / 1" :src="appLogo" />
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-weight-bolder text-h6 text-italic">{{
                appName
            }}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <slot name="right"></slot>
        </q-item-section>
    </q-item>
    <q-avatar v-else-if="logoOnly" color="white">
        <q-img :ratio="1 / 1" :src="appLogo" />
    </q-avatar>
    <div class="text-h6 text-italic text-weight-bolder" v-else-if="nameOnly">
        {{ appName }}
    </div>
</template>
<script setup lang="ts">
import useAppMeta from 'src/composables/common/useAppMeta';
const { appName, appLogo } = useAppMeta();
withDefaults(defineProps<{ logoOnly?: boolean; nameOnly?: boolean }>(), {
    logoOnly: false,
    nameOnly: false,
});
</script>

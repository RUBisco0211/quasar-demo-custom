<template>
    <q-breadcrumbs>
        <template #separator>
            <q-icon name="mdi-slash-forward"></q-icon>
        </template>
        <q-breadcrumbs-el
            v-for="item in breadCrumbs.slice(1)"
            :key="item.name"
            :class="props.textClass"
            :label="item.meta.label"
            :icon="props.withIcon ? item.meta.icon : undefined"
            :to="{ name: item.name }"
        ></q-breadcrumbs-el>
    </q-breadcrumbs>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const breadCrumbs = computed(() => {
    return router.currentRoute.value.matched;
});
const props = withDefaults(
    defineProps<{ textClass?: string; withIcon?: boolean }>(),
    {
        withIcon: false,
        textClass: 'text-h6',
    }
);
</script>

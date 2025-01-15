<template>
    <q-item-label class="q-mx-md q-my-sm" header v-if="meta?.group">
        {{ meta?.group }}
    </q-item-label>
    <q-expansion-item
        class="q-mx-md q-my-sm rounded-borders"
        dense
        v-if="hasChildren"
        expand-icon="eva-arrow-right-outline text-caption"
        :header-inset-level="(meta?.depth as number) * inset"
    >
        <template #header>
            <q-item-section side>
                <q-icon :name="icon" size="xs" :class="iconClass" />
            </q-item-section>
            <q-item-section>
                <q-item-label class="text-weight-medium text-body1">
                    {{ meta?.label }}
                </q-item-label>
            </q-item-section>
            <slot name="tooltip"></slot>
        </template>
        <SideNavMenuItem v-for="(item, i) in children" :key="i" v-bind="item" />
    </q-expansion-item>

    <q-item
        class="q-mx-md q-my-sm rounded-borders"
        dense
        v-else-if="canDisplay"
        v-ripple
        clickable
        :to="{ name }"
        :active="isActive"
        :active-class="activeClass"
        :inset-level="(meta?.depth as number) * inset"
    >
        <q-item-section side>
            <q-icon :name="icon" size="xs" :class="iconClass" />
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-weight-medium text-body1">
                {{ meta?.label }}
            </q-item-label>
        </q-item-section>
        <slot name="tooltip"></slot>
    </q-item>
    <q-separator v-if="meta?.separate" class="q-my-sm" inset></q-separator>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router';
import { computed, VNode } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const inset = 0.6;
const props = defineProps<RouteRecordRaw>();
import { useQuasar } from 'quasar';
const $q = useQuasar();

defineSlots<{
    tooltip: () => VNode[];
}>();

const hasChildren = computed(() => {
    return props.children && props.children.length > 0;
});

const canDisplay = computed(() => {
    return props.meta!.display !== false;
});

const isActive = computed(() => props.name === router.currentRoute.value.name);
const icon = computed(() =>
    isActive.value
        ? props.meta?.activeIcon ?? props.meta?.icon
        : props.meta?.icon
);
const iconClass = computed(() => {
    return {
        'text-primary': isActive.value,

        'text-dark': !isActive.value && !$q.dark.isActive,
        'text-light': !isActive.value && $q.dark.isActive,
    };
});

const activeClass = computed(() =>
    $q.dark.isActive
        ? 'bg-dark-active text-light active-item'
        : 'bg-light-active text-dark active-item'
);
</script>
<style lang="scss" scoped>
.q-item--clickable {
    border-radius: $radius !important;
}

.q-expansion-item {
    :deep(.q-item--clickable) {
        border-radius: $radius !important;
    }
    :deep(.q-expansion-item__toggle-icon--rotated) {
        transform: rotate(90deg) !important;
        transition: 0.15s;
    }
}
.active-item {
    color: $primary !important;
}
</style>

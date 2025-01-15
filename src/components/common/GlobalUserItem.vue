<template>
    <q-item
        v-if="!props.avatarOnly"
        :clickable="props.clickable"
        v-ripple="props.clickable"
    >
        <slot name="popup"></slot>
        <q-item-section avatar>
            <q-avatar size="xl" color="grey-6" text-color="white">
                <q-img :ratio="1 / 1" v-if="user.avatar" :src="user.avatar">
                </q-img>
                <q-icon v-else :name="defaultUserAvatar" size="sm" />
            </q-avatar>
        </q-item-section>
        <q-item-section>
            <q-item-label class="text-body1">
                {{ user.name }}
            </q-item-label>
        </q-item-section>
    </q-item>
    <q-avatar color="grey-6" v-else class="cursor-pointer" text-color="white">
        <q-img :ratio="1 / 1" v-if="user.avatar" :src="user.avatar">
            <template #error>
                <q-icon
                    :name="defaultUserAvatar"
                    size="xs"
                    class="absolute-center"
                />
            </template>
        </q-img>
        <q-icon v-else :name="defaultUserAvatar" size="xs" />
        <slot name="popup"></slot>
    </q-avatar>
</template>
<script setup lang="ts">
import { VNode } from 'vue';
import { storeToRefs } from 'pinia';
import useUserStore from 'src/stores/user';
const { user } = storeToRefs(useUserStore());
const defaultUserAvatar = 'ri:user-line';

defineSlots<{
    popup: () => VNode[];
}>();

const props = withDefaults(
    defineProps<{ avatarOnly?: boolean; clickable?: boolean }>(),
    {
        avatarOnly: false,
        clickable: false,
    }
);
</script>

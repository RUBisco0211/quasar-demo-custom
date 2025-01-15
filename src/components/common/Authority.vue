<template>
    <slot :authorized="isAuthorized" v-if="isAuthorized"></slot>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import useUserStore from 'src/stores/user';
import { storeToRefs } from 'pinia';
const { user } = storeToRefs(useUserStore());

const props = defineProps<{
    permission?: string; // 内部组件需要的权限
}>();

const isAuthorized = computed(() => {
    // 组件不需要权限
    if (!props.permission) return true;
    // 用户没有任何权限
    if (!user.value.roles) return false;
    return user.value.roles.includes(props.permission);
});
</script>

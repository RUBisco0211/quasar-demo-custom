<template>
    <div class="fullscreen text-center" :class="globalClass">
        <div>
            <img
                src="@/assets/illustrations/404.svg"
                style="height: 600px"
                class="q-mt-xl"
            />
            <div class="text-h4" style="opacity: 0.4">qwq 这里什么都没有</div>

            <Btn
                class="q-mt-xl"
                color="primary"
                unelevated
                to="/"
                label="返回主页"
                icon="ri:home-5-line"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const globalClass = computed(() => {
    return $q.dark.isActive
        ? 'bg-dark-page text-light'
        : 'bg-light-page text-dark';
});
</script>

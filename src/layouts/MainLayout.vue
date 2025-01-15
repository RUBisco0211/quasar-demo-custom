<template>
    <q-layout view="lHh Lpr lFf" :class="globalClass">
        <Header class="q-py-sm" :class="headerClass">
            <template #left>
                <BtnFlat
                    v-if="!$q.screen.gt.sm"
                    round
                    :icon="
                        !leftDrawerOpen
                            ? 'eva-menu-outline'
                            : 'eva-menu-2-outline'
                    "
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <BtnFlat
                    v-else
                    round
                    :icon="
                        !leftDrawerMini
                            ? 'eva-menu-outline'
                            : 'eva-menu-2-outline'
                    "
                    @click="leftDrawerMini = !leftDrawerMini"
                />
            </template>
            <template #right>
                <DarkToggle color="blue-5" />
                <template v-if="$q.screen.gt.sm">
                    <BtnFlat
                        round
                        v-for="btn in headerBtns"
                        :icon="btn.icon"
                        :tooltip="btn.label"
                        :key="btn.label"
                    />
                </template>
                <GlobalUserItem avatar-only class="q-ml-sm">
                    <template #popup>
                        <q-menu
                            style="width: 250px"
                            transition-show="jump-down"
                            transition-hide="jump-up"
                        >
                            <q-list>
                                <Img
                                    v-ripple
                                    @click="$router.push({ name: 'personal' })"
                                    class="full-width cursor-point"
                                    height="150px"
                                    src="https://images.unsplash.com/photo-1723155094419-5ac8b25072d7?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                >
                                    <div
                                        class="fixed-bottom edge-gradient-bottom"
                                    >
                                        <GlobalUserItem
                                            class="q-ma-none q-pa-none"
                                        />
                                    </div>
                                </Img>
                                <q-separator class="q-mb-sm"></q-separator>
                                <template v-if="!$q.screen.gt.md">
                                    <q-item
                                        clickable
                                        v-ripple
                                        v-for="item in headerBtns"
                                        :key="item.label"
                                    >
                                        <q-item-section side>
                                            <q-icon :name="item.icon"></q-icon>
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>{{
                                                item.label
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-separator class="q-my-sm"></q-separator>
                                </template>
                                <q-item
                                    clickable
                                    v-ripple
                                    v-for="item in headerMenuItems"
                                    :key="item.label"
                                >
                                    <q-item-section side>
                                        <q-icon :name="item.icon"></q-icon>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{
                                            item.label
                                        }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-separator class="q-mt-sm"></q-separator>
                                <q-item class="q-pa-md">
                                    <Btn
                                        class="full-width"
                                        label="退出登录"
                                        color="negative"
                                        icon-right="ri:logout-box-r-line"
                                    />
                                </q-item>
                            </q-list>
                        </q-menu>
                    </template>
                </GlobalUserItem>
            </template>
        </Header>
        <q-drawer
            bordered
            v-model:mini="leftDrawerMini"
            v-model:model-value="leftDrawerOpen"
            :mini-width="64"
            :width="280"
        >
            <LogoItem class="q-py-md q-mx-sm absolute-top" ref="logoItemRef">
            </LogoItem>
            <q-scroll-area :style="scrollAreaStyle">
                <SideNavMenu :mini="leftDrawerMini" />
            </q-scroll-area>
        </q-drawer>
        <q-page-container>
            <router-view v-slot="{ Component }">
                <transition
                    appear
                    enter-active-class="animated fadeInUp"
                    leave-active-class="animated fadeOutUp"
                    :duration="{ enter: 300, leave: 300 }"
                    mode="out-in"
                >
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import useViewsStore from 'src/stores/views';
import { storeToRefs } from 'pinia';
import GlobalUserItem from 'src/components/common/GlobalUserItem.vue';
const { leftDrawerOpen, leftDrawerMini } = storeToRefs(useViewsStore());
const searchText = ref('');

const $q = useQuasar();
const globalClass = computed(() => {
    return $q.dark.isActive
        ? 'bg-dark-page text-light'
        : 'bg-light-page text-dark';
});
const drawerClass = computed(() => {
    return $q.dark.isActive ? 'bg-dark text-light' : 'bg-light text-dark';
});

const headerClass = computed(() => {
    return $q.dark.isActive
        ? 'bg-dark-page text-light'
        : 'bg-light-page text-dark';
});

const headerBtns = [
    {
        label: '语言',
        icon: 'ri:translate',
    },
    {
        label: '搜索',
        icon: 'ri:search-2-line',
    },
    {
        label: '通知',
        icon: 'ri:notification-3-line',
    },
];

const headerMenuItems = [
    {
        label: '用户设置',
        icon: 'ri:user-settings-line',
    },
    {
        label: '设置',
        icon: 'ri:settings-5-line',
    },
];

const logoItemRef = ref();
const scrollAreaStyle = computed(() => {
    if (!logoItemRef.value) return;
    const logoHeight = window.getComputedStyle(logoItemRef.value.$el).height;
    return {
        height: `calc(100% - ${logoHeight})`,
        top: logoHeight,
    };
});
</script>

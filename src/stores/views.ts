import { defineStore } from 'pinia';
import { getCssVar } from 'quasar';
import { ref, watchEffect } from 'vue';
import { Screen } from 'quasar';

export default defineStore(
    'views',
    () => {
        const leftDrawerOpen = ref(false);
        const initLeftDrawerOpen = (value: boolean) => {
            if (leftDrawerOpen.value === undefined)
                leftDrawerOpen.value = value;
        };
        const leftDrawerMini = ref(false);
        watchEffect(() => {
            if (Screen.gt.sm) leftDrawerOpen.value = true;
            else leftDrawerOpen.value = false;
        });

        const colors = {
            brandColors: {
                primary: getCssVar('primary')!,
                positive: getCssVar('positive')!,
                secondary: getCssVar('secondary')!,
                warning: getCssVar('warning')!,
                negative: getCssVar('negative')!,
                info: getCssVar('info')!,
                accent: getCssVar('accent')!,
            },
            themeColors: {
                dark: getCssVar('dark')!,
                light: getCssVar('light')!,
                darkPage: getCssVar('dark-page')!,
                lightPage: getCssVar('light-page')!,
                lightText: getCssVar('light-text')!,
                darkText: getCssVar('dark-text')!,
            },
        };
        return {
            leftDrawerOpen,
            initLeftDrawerOpen,
            colors,
            leftDrawerMini,
        };
    },
    {
        persist: {
            paths: ['leftDrawerMini'],
        },
    }
);

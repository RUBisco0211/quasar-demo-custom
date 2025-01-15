import { computed, ref } from 'vue';

export default function useAppMeta() {
    const appName = ref(process.env.VITE_APP_NAME);
    const appLogo = ref(process.env.VITE_APP_LOGO);
    const titleTemplate = computed(() => (pageName: string) => {
        return `${pageName} | ${appName.value}`;
    });

    return {
        appName,
        appLogo,
        titleTemplate,
    };
}

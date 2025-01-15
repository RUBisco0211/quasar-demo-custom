import { boot } from 'quasar/wrappers';
import { Directive } from 'vue';
import { Notify, copyToClipboard } from 'quasar';
import { vOnClickOutside } from '@vueuse/components';

const directives: Record<string, Directive<HTMLElement, any>> = {
    // v-focus
    focus: (el, { value }: { value: boolean | undefined }) => {
        if (value === undefined || value === true) {
            el.focus();
        }
    },
    // v-click-copy
    clickCopy: (
        el,
        {
            value,
        }: {
            value: {
                text: string;
                onSuccess?: () => void;
                onError?: () => void;
            };
        }
    ) => {
        const {
            text,
            onSuccess = () => {
                Notify.create({
                    type: 'positive',
                    message: '复制成功',
                });
            },
            onError = () => {
                Notify.create({
                    type: 'negative',
                    message: '复制失败',
                });
            },
        } = value;
        el.onclick = async () => {
            copyToClipboard(text).then(onSuccess).catch(onError);
        };
    },
    // v-click-outside
    clickOutside: vOnClickOutside,
};

export default boot(({ app }) => {
    Object.entries(directives).forEach(([name, directive]) => {
        app.directive(name, directive);
    });
});

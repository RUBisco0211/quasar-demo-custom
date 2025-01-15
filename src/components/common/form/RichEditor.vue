<template>
    <q-editor
        :placeholder="props.placeholder"
        v-model="text"
        class="rounded-borders"
        toolbar-rounded
        :definitions="definitions"
        :toolbar="toolbar"
        :fonts="fonts"
    ></q-editor>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
import { useFileDialog } from '@vueuse/core';

const { open, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
});

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
    imgAddFn?: (file: File) => Promise<string> | string;
}>();

const emits = defineEmits<{
    (e: 'update:model-value', text: string): void;
}>();

const text = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits('update:model-value', value);
    },
});

onChange(async (files) => {
    if (!files) return;
    if (files.length == 0) return;
    const imgUrl = props.imgAddFn && (await props.imgAddFn(files[0]));
    text.value += imgTemplate(imgUrl);
});

const imgTemplate = (url?: string) =>
    `<div> <img src="${url}" style=\'height: 300px\'></img> </div>`;

const definitions = computed(() => {
    return {
        image: {
            icon: 'mdi-image-plus-outline',
            tip: '插入图片',
            handler: open,
        },
    };
});

const toolbar = computed(() => {
    return [
        [
            {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                options: ['left', 'center', 'right', 'justify'],
            },
        ],
        [
            'bold',
            'italic',
            'strike',
            'underline',
            'quote',
            'subscript',
            'superscript',
        ],
        ['token', 'hr'],
        ['image', 'link'],
        [
            {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },

            {
                icon: $q.iconSet.editor.fontSize,
                label: $q.lang.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                ],
            },
            {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                ],
            },
            'removeFormat',
        ],
        ['unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource'],
    ];
});

const fonts = computed(() => {
    return {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana',
    };
});
</script>

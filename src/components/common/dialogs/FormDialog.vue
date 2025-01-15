<template>
    <q-dialog
        maximized
        position="right"
        ref="dialogRef"
        :persistent="props.persistent"
        :seamless="props.seamless"
    >
        <q-card :style="{ width }">
            <q-form
                ref="formRef"
                @submit.prevent="emits('submit')"
                @reset="emits('reset')"
            >
                <q-card-section ref="cardHeaderRef">
                    <q-toolbar>
                        <slot name="header-title">
                            <q-toolbar-title>{{ title }}</q-toolbar-title>
                        </slot>
                        <q-space></q-space>
                        <slot name="header-actions"> </slot>
                        <BtnFlat
                            round
                            icon="eva-close-outline"
                            tooltip="关闭"
                            v-close-popup
                        />
                    </q-toolbar>
                </q-card-section>
                <slot name="body" :height="scrollAreaHeight"></slot>
            </q-form>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
defineSlots<{
    'header-title': () => VNode[];
    'header-actions': () => VNode[];
    body: () => VNode[];
}>();

import { ref, computed, VNode } from 'vue';
import { QCardSection, useDialogPluginComponent } from 'quasar';
const cardHeaderRef = ref();
const scrollAreaRef = ref();

const scrollAreaHeight = computed(() => {
    if (!cardHeaderRef.value) return;
    const h = window.getComputedStyle(cardHeaderRef.value.$el).height;
    return `calc(100vh - ${h} - 2px)`;
});
const props = withDefaults(
    defineProps<{
        title?: string;
        width?: string;
        persistent?: boolean;
        seamless?: boolean;
    }>(),
    { width: '500px', persistent: false, seamless: false }
);

const emits = defineEmits<{
    (e: 'submit'): void;
    (e: 'reset'): void;
}>();

const { dialogRef } = useDialogPluginComponent();

const formRef = ref();

defineExpose({ dialogRef, formRef, scrollAreaRef });
/*
使用时在父组件加上

```
<FormDialog
        ref="baseDialogRef" ...>
</FormDialog>
```
```
const baseDialogRef = ref();
onMounted(() => {
    dialogRef.value = baseDialogRef.value.dialogRef;
});
以获取子组件的dialogRef
```
*/
</script>

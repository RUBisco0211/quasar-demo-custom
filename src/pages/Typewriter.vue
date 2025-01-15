<template>
    <Page>
        <div class="absolute-center">
            <div class="text-center">
                <span class="text-h1 text-weight-bold typewriter-text">
                    {{ text }}
                </span>
            </div>
        </div>
        <template #page-sticky>
            <q-page-sticky position="top" :offset="[0, 50]">
                <q-btn-group flat>
                    <Btn
                        stack
                        flat
                        label="开始"
                        :disable="taskQueue.length === 0"
                        icon="ri:play-line"
                        @click="startTyping"
                    ></Btn>
                    <Btn
                        stack
                        flat
                        label="清空"
                        :disable="taskQueue.length === 0"
                        icon="ri:reset-left-line"
                        @click="text = ''"
                    ></Btn>
                    <Btn
                        stack
                        flat
                        label="编辑"
                        icon="eva-edit-2-outline"
                        @click="openDialog"
                    ></Btn>
                    <Btn
                        v-bind="copyBtn"
                        stack
                        v-click-copy="{
                            text,
                        }"
                        flat
                    ></Btn>
                </q-btn-group>
            </q-page-sticky>
        </template>
    </Page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTypewriter } from '@/composables/service/useTypewriter';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import TypewriterTaskDialog from '@/components/service/typewriter/TypewriterTaskDialog.vue';
const $q = useQuasar();

const { text, typewriter, taskQueue } = useTypewriter();

const copied = ref(false);
const copyBtn = computed(() => {
    return {
        icon: copied.value ? 'ri:file-copy-fill' : 'ri:file-copy-line',
        label: copied.value ? '已复制' : '复制',
    };
});

onMounted(() => {
    taskQueue.value = [
        {
            type: 'type',
            text: 'Hello World',
        },
        {
            type: 'pause',
            duration: 2000,
        },
        {
            type: 'type',
            text: 'Hello World',
        },
        {
            type: 'pause',
            duration: 2000,
        },
        {
            type: 'backspace',
            length: 10,
        },
    ];
});

const startTyping = () => {
    if (taskQueue.value.length === 0) {
        $q.notify({
            type: 'warning',
            message: '还未定义打字机行为',
        });
        return;
    }
    typewriter.reset().go();
};

const options = ref({
    initial: '',
    typeSpeed: 200,
    deleteSpeed: 100,
});

const openDialog = () => {
    $q.dialog({
        component: TypewriterTaskDialog,
        componentProps: {
            options: { ...options.value },
            tasks: [...taskQueue.value],
        },
    }).onOk((res) => {
        taskQueue.value = res.tasks;
        options.value = res.options;
        typewriter.setDefaults(options.value).reset();
        $q.notify({
            type: 'positive',
            message: '保存成功',
        });
    });
};

const cursorBorderColor = computed(() => {
    return $q.dark.isActive ? 'white' : 'black';
});
</script>
<style lang="scss">
.typewriter-text {
    border-right: 3px solid v-bind(cursorBorderColor);
    animation: typewriter_cursor_blink 1s step-end infinite;
}
@keyframes typewriter_cursor_blink {
    from,
    to {
        border-color: transparent;
    }
    50% {
        border-color: v-bind(cursorBorderColor);
    }
}
</style>

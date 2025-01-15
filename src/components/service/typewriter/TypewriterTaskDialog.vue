<template>
    <FormDialog
        title="打字机任务"
        width="600px"
        ref="baseDialogRef"
        @submit="onSave"
    >
        <template #header-actions>
            <BtnFlat
                round
                tooltip="保存"
                type="submit"
                icon="eva-checkmark-outline"
            ></BtnFlat>
            <BtnFlat tooltip="添加" round icon="eva-plus-outline">
                <q-menu
                    auto-close
                    transition-show="jump-down"
                    transition-hide="jump-up"
                >
                    <q-list class="q-py-sm">
                        <q-item
                            v-for="(v, k) in taskTypes"
                            :key="k"
                            clickable
                            v-ripple
                            @click="onAdd(k)"
                        >
                            <q-item-section side>
                                <q-icon
                                    :name="v.icon"
                                    :color="v.color"
                                ></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>{{ v.label }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </BtnFlat>
        </template>
        <template #body="{ height }">
            <q-separator></q-separator>
            <q-scroll-area :style="{ height }">
                <VueDraggable
                    v-model="formData"
                    :animation="150"
                    target=".container"
                    handle=".drag-handle"
                >
                    <q-list class="container" separator>
                        <q-item
                            class="q-mx-sm"
                            v-for="(task, i) in formData"
                            :key="i"
                        >
                            <q-item-section side class="drag-handle">
                                <q-icon name="ri:draggable"> </q-icon>
                            </q-item-section>
                            <q-item-section side>
                                <q-avatar
                                    size="sm"
                                    color="primary"
                                    text-color="white"
                                    ghostClass="ghost"
                                >
                                    {{ i + 1 }}
                                </q-avatar>
                            </q-item-section>

                            <q-item-section class="q-pt-md">
                                <FormItem
                                    v-if="task.type === 'type'"
                                    v-bind="formItem(task, i)"
                                    v-model="task.text"
                                >
                                    <template #after>
                                        <BtnFlat
                                            round
                                            icon="eva-trash-outline"
                                            color="negative"
                                            @click="onDelete(i)"
                                        />
                                    </template>
                                </FormItem>
                                <FormItem
                                    v-if="task.type === 'pause'"
                                    v-bind="formItem(task, i)"
                                    v-model="task.duration"
                                >
                                    <template #after>
                                        <BtnFlat
                                            round
                                            icon="eva-trash-outline"
                                            color="negative"
                                            @click="onDelete(i)"
                                        />
                                    </template>
                                </FormItem>
                                <FormItem
                                    v-if="task.type === 'backspace'"
                                    v-bind="formItem(task, i)"
                                    v-model="task.length"
                                >
                                    <template #after>
                                        <BtnFlat
                                            round
                                            icon="eva-trash-outline"
                                            color="negative"
                                            @click="onDelete(i)"
                                        />
                                    </template>
                                </FormItem>
                            </q-item-section>
                        </q-item>
                    </q-list>

                    <Empty :show="formData.length === 0" label="暂无任务">
                        <Btn
                            color="primary"
                            label="添加"
                            unelevated
                            icon="eva-plus-outline"
                        >
                            <q-menu
                                auto-close
                                transition-show="jump-down"
                                transition-hide="jump-up"
                            >
                                <q-list class="q-py-sm">
                                    <q-item
                                        v-for="(v, k) in taskTypes"
                                        :key="k"
                                        clickable
                                        v-ripple
                                        @click="onAdd(k)"
                                    >
                                        <q-item-section side>
                                            <q-icon
                                                :name="v.icon"
                                                :color="v.color"
                                            ></q-icon>
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>{{
                                                v.label
                                            }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-menu>
                        </Btn>
                    </Empty>
                </VueDraggable>
            </q-scroll-area>
        </template>
    </FormDialog>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import {
    BackspaceTask,
    PauseTask,
    TypeTask,
    TypewriterOptions,
    TypewriterTask,
} from '@/composables/service/useTypewriter';
import { useDialogPluginComponent } from 'quasar';
import { FormItemProps } from 'src/models/props';
import { VueDraggable } from 'vue-draggable-plus';

type dialogProps = {
    options: Omit<TypewriterOptions, 'onTaskStart'>;
    tasks: TypewriterTask[];
};
const props = defineProps<dialogProps>();

const { dialogRef, onDialogOK } = useDialogPluginComponent<dialogProps>();
const baseDialogRef = ref();

onMounted(() => {
    dialogRef.value = baseDialogRef.value.dialogRef;
});

const taskTypes = {
    type: {
        icon: 'eva-text-outline',
        color: 'positive',
        label: '输入任务',
        info: (task: TypeTask) =>
            `输入文字 ${
                task.text === '' || task.text === undefined
                    ? '?'
                    : `"${task.text}"`
            } `,
    },
    pause: {
        icon: 'ri:pause-circle-line',
        color: 'warning',
        label: '暂停任务',
        info: (task: PauseTask) =>
            `暂停 ${
                task.duration === undefined || task.duration <= 0
                    ? '?'
                    : task.duration
            } 毫秒`,
    },
    backspace: {
        icon: 'ri:delete-back-2-line',
        color: 'negative',
        label: '退格任务',
        info: (task: BackspaceTask) =>
            `退格 ${
                task.length === undefined || task.length <= 0
                    ? '?'
                    : task.length
            } 个字符`,
    },
};

const formItem = computed<(task: TypewriterTask, i: number) => FormItemProps>(
    () => (t, i) => {
        const { type } = t;
        switch (type) {
            case 'type':
                return {
                    formItemType: 'input',
                    label: '输入文本',
                    name: `task-${i}-text`,
                    type: 'text',
                    icon: taskTypes[type].icon,
                    lazyRules: false,
                    rules: [
                        (val: string) =>
                            (!!val && val.length > 0) || '请输入文本',
                    ],
                };
            case 'pause':
                return {
                    formItemType: 'input',
                    label: '暂停时间',
                    name: `task-${i}-duration`,
                    type: 'number',
                    icon: taskTypes[type].icon,
                    suffix: '毫秒',
                    lazyRules: false,
                    rules: [(val: number) => val > 0 || '请输入大于0的数字'],
                };
            case 'backspace':
                return {
                    formItemType: 'input',
                    label: '删除字符数',
                    name: `task-${i}-length`,
                    type: 'number',
                    icon: taskTypes[type].icon,
                    lazyRules: false,
                    rules: [
                        (val: number) => val > 0 || '请输入大于等于0的数字',
                    ],
                };
        }
    }
);

const formData = ref<TypewriterTask[]>([...props.tasks]);

const onSave = async () => {
    onDialogOK &&
        onDialogOK({
            options: { ...props.options },
            tasks: [...formData.value],
        });
};

const onAdd = (type: keyof typeof taskTypes) => {
    let newTask;
    switch (type) {
        case 'type':
            newTask = { type, text: '' };
            break;
        case 'pause':
            newTask = { type, duration: 0 };
            break;
        case 'backspace':
            newTask = { type, length: 0 };
            break;
    }
    formData.value.push(newTask);
};

const onDelete = (index: number) => {
    formData.value.splice(index, 1);
};
</script>
<style lang="scss" scoped>
.drag-handle {
    cursor: move;
}
.ghost {
    opacity: 0.5;
}
</style>

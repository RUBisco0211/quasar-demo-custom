<template>
    <!-- 文字输入框 -->
    <q-input
        v-if="formItemType === 'input' && (props as InputProps).type !== 'number'"
        v-bind="props"
        v-model="value"
        unmasked-value
        :dark="$q.dark.isActive"
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-input>

    <!-- 数字输入框 -->
    <q-input
        v-if="formItemType === 'input' && (props as InputProps).type === 'number'"
        v-bind="props"
        v-model.number="value"
        unmasked-value
        :dark="$q.dark.isActive"
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-input>

    <!-- 下拉选择 -->
    <q-select
        v-if="formItemType === 'select'"
        v-bind="props"
        dropdownIcon="eva-arrow-down-outline"
        map-options
        emit-value
        :dark="$q.dark.isActive"
        v-model="value"
        :options-dark="$q.dark.isActive"
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-select>

    <!-- 日期选择 -->
    <q-input
        v-if="formItemType === 'datePicker'"
        v-bind="props"
        v-model="value"
        :dark="$q.dark.isActive"
        unmasked-value
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>
        <template #append>
            <q-btn flat round icon="ri:calendar-event-line" color="primary">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date
                        v-bind="(props as DatePickerProps).dateProps"
                        :readonly="props.readonly"
                        flat
                        today-btn
                        style="width: 400px"
                        v-model="value"
                    >
                    </q-date>
                </q-popup-proxy>
            </q-btn>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-input>

    <!-- 日期时间选择 -->
    <q-input
        v-if="formItemType === 'dateTimePicker'"
        v-bind="props"
        :dark="$q.dark.isActive"
        v-model="value"
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>
        <template #append>
            <q-btn flat round icon="ri:time-line" color="primary">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <div
                        :class="{
                            row: $q.screen.gt.md,
                            column: $q.screen.lt.md,
                        }"
                        :style="{ height: $q.screen.gt.md ? '400px' : '800px' }"
                    >
                        <div class="col-6">
                            <q-date
                                v-bind="(props as DateTimePickerProps).dateProps"
                                today-btn
                                style="height: 400px"
                                :readonly="props.readonly"
                                flat
                                v-model="value"
                            >
                            </q-date>
                        </div>
                        <div class="col-6">
                            <q-time
                                v-bind="(props as DateTimePickerProps).timeProps"
                                now-btn
                                style="height: 400px"
                                :readonly="props.readonly"
                                flat
                                v-model="value"
                                format24h
                            >
                            </q-time>
                        </div>
                    </div>
                </q-popup-proxy>
            </q-btn>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-input>

    <!-- 颜色选择 -->
    <q-input
        v-if="formItemType === 'colorPicker'"
        v-bind="props"
        v-model="value"
        :dark="$q.dark.isActive"
        class="q-pb-lg"
    >
        <template #prepend v-if="icon">
            <q-icon :name="icon"></q-icon>
        </template>

        <template #append>
            <q-btn flat round icon="ri:palette-line" color="primary">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color
                        v-bind="(props as ColorPickerProps).colorProps"
                        :readonly="props.readonly"
                        :dark="$q.dark.isActive"
                        v-model="value"
                    />
                </q-popup-proxy>
            </q-btn>
        </template>
        <template #after>
            <slot name="after"></slot>
        </template>
    </q-input>
</template>
<script setup lang="ts">
import {
    FormItemProps,
    InputProps,
    DatePickerProps,
    DateTimePickerProps,
    ColorPickerProps,
} from 'src/models/props';
import { computed, VNode } from 'vue';
const props = withDefaults(defineProps<FormItemProps>(), {
    readonly: false,
    clearable: true,
    clearIcon: 'eva-close-outline',
    lazyRules: 'ondemand',
    outlined: true,
});

const emits = defineEmits<{
    (e: 'update:model-value', value: any): void;
}>();
const value = computed({
    get: () => props.modelValue,
    set: (v) => emits('update:model-value', v),
});
defineSlots<{
    after: () => VNode[];
}>();
</script>

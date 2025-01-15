<template>
    <VueCropper
        class="rounded-borders"
        :style="{ height: `${height}px` }"
        ref="cropperRef"
        v-bind="cropperOption"
    />
    <div class="row q-gutter-md q-py-md">
        <q-btn-group flat>
            <BtnFlat
                dense
                class="q-px-sm"
                v-for="btn in btns"
                :key="btn.icon"
                v-bind="btn"
                @click="btn.onClick"
            ></BtnFlat>
        </q-btn-group>
        <q-space></q-space>
        <div>
            <Btn
                class="q-mr-md"
                label="更改图片"
                icon="eva-image-outline"
                @click="open()"
            />
            <Btn label="确定" icon="eva-checkmark-outline" @click="onSave" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import { ref, computed, onUnmounted } from 'vue';

const { open, files } = useFileDialog({
    multiple: false,
    accept: 'image/*',
});

const props = withDefaults(
    defineProps<{
        height?: number;
        img?: string | Blob;
        fixed?: boolean;
        fixedNumber?: number[];
    }>(),
    {
        height: 500,
        fixed: false,
    }
);

const emits = defineEmits<{
    (e: 'update', img: Blob): void;
}>();

const cropperRef = ref();

const cropperOption = computed(() => {
    let image = undefined;
    if (files.value && files.value.length > 0) {
        const file = files.value[0];
        image = URL.createObjectURL(new Blob([file], { type: file.type }));
    }
    return {
        img: image ?? props.img,
        size: 1,
        outputType: 'jpeg || png || webp', // 裁剪生成图片的格式
        outputSize: 1, // 裁剪生成图片的质量
        full: false, // 输出原图比例截图 props名full
        autoCrop: true, //    是否默认生成截图框
        canMove: true, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        fixedBox: false, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        autoCropWidth: 400, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        enlarge: 1, // 图片根据截图框输出比例倍数
        maxImgSize: 2000, // 限制图片最大宽度和高度
        fixed: props.fixed, // 是否开启截图框宽高固定比例
        fixedNumber: props.fixedNumber ?? [4, 3], // 固定比例
        info: true,
        mode: '100%',
    };
});

const onSave = () => {
    cropperRef.value.getCropBlob((blob: Blob) => {
        emits('update', blob);
    });
};

const btns = [
    {
        icon: 'mdi-magnify-plus-outline',
        tooltip: '放大',
        onClick: () => {
            cropperRef.value.changeScale(10);
        },
    },
    {
        icon: 'mdi-magnify-minus-outline',
        tooltip: '缩小',
        onClick: () => {
            cropperRef.value.changeScale(-10);
        },
    },
    {
        icon: 'mdi-rotate-left',
        tooltip: '左转',
        onClick: () => {
            cropperRef.value.rotateLeft();
        },
    },
    {
        icon: 'mdi-rotate-right',
        tooltip: '右转',
        onClick: () => {
            cropperRef.value.rotateRight();
        },
    },
];

onUnmounted(() => {
    URL.revokeObjectURL(cropperOption.value.img as string);
});
</script>

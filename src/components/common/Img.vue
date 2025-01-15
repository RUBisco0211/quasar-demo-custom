<template>
    <q-img v-bind="props">
        <slot></slot>
        <template #error>
            <div class="absolute-full text-white text-body1">
                <div class="absolute-center">
                    <div class="row justify-center">
                        <q-icon
                            :name="props.errorIcon"
                            size="xl"
                            color="white"
                            class="q-mr-sm"
                        />
                    </div>
                    {{ props.errorMessage }}
                </div>
            </div>
        </template>
    </q-img>
</template>
<script setup lang="ts">
import { QImgProps } from 'quasar';

const props = withDefaults(
    defineProps<
        QImgProps & {
            errorMessage?: string;
            errorIcon?: string;
            preview?: boolean;
        }
    >(),
    {
        errorMessage: '图片加载失败',
        errorIcon: 'mdi-image-broken-variant',
        preview: false,
    }
);
</script>

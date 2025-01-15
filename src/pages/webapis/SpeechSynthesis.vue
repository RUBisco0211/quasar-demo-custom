<template>
    <Page col-class="col-md-6 col-12">
        <div class="q-pa-lg">
            <q-card flat>
                <q-card-section>
                    <q-toolbar>
                        <q-toolbar-title>文本朗读</q-toolbar-title>
                    </q-toolbar>
                </q-card-section>

                <q-card-section class="q-pa-lg">
                    <q-input
                        type="textarea"
                        label="要朗读的文本"
                        autogrow
                        v-model="text"
                        class="q-mb-lg"
                    >
                        <template #prepend>
                            <q-icon name="eva-text" />
                        </template>
                    </q-input>
                    <q-select
                        form-item-type="select"
                        use-input
                        @filter="onFilter"
                        input-debounce="300"
                        label="选择人声"
                        v-model="voice"
                        :options="voiceOptions"
                        :option-value="(v:SpeechSynthesisVoice) => v.name"
                        :option-label="(v:SpeechSynthesisVoice) => v.name"
                        class="q-mb-lg"
                    >
                        <template #prepend>
                            <q-icon name="ri:user-voice-line" />
                        </template>
                    </q-select>
                    <div class="row q-col-gutter-lg">
                        <div class="col-6">
                            <q-field
                                stack-label
                                borderless
                                label="语调"
                                v-model="pitch"
                            >
                                <template #control>
                                    <q-slider
                                        v-model="pitch"
                                        :min="0"
                                        :max="2"
                                        :step="0.1"
                                        label-always
                                        label-format="0.1"
                                    ></q-slider>
                                </template>
                            </q-field>
                        </div>
                        <div class="col-6">
                            <q-field
                                stack-label
                                borderless
                                label="语速"
                                v-model="rate"
                            >
                                <template #control>
                                    <q-slider
                                        v-model="rate"
                                        :min="0"
                                        :max="2"
                                        :step="0.1"
                                        label-always
                                        label-format="0.1"
                                    ></q-slider>
                                </template>
                            </q-field>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="center" class="q-pa-lg">
                    <BtnFlat
                        round
                        icon="ri:play-line"
                        @click="play"
                        tooltip="播放"
                        :disabled="speech.isPlaying.value"
                    />
                    <BtnFlat
                        round
                        icon="ri:pause-line"
                        @click="pause"
                        tooltip="暂停"
                        :disabled="!speech.isPlaying.value"
                    />
                    <BtnFlat
                        round
                        icon="ri:stop-line"
                        @click="stop"
                        tooltip="停止"
                        :disabled="!speech.isPlaying.value"
                    />
                </q-card-actions>
            </q-card>
        </div>
    </Page>
</template>
<script setup lang="ts">
import { MaybeRef, onMounted, onUnmounted, ref } from 'vue';
import { useSpeechSynthesis } from '@vueuse/core';
import { QSelectProps } from 'quasar';
let synth: SpeechSynthesis;

const text = ref('');
let allVoices: SpeechSynthesisVoice[] = [];
const voiceOptions = ref<SpeechSynthesisVoice[]>([]);
const voice = ref<SpeechSynthesisVoice>();
const pitch = ref(1);
const rate = ref(1);

let timeout: number;
onMounted(() => {
    if (!speech.isSupported.value) return;
    timeout = window.setTimeout(() => {
        synth = window.speechSynthesis;
        allVoices = synth.getVoices();
    });
});
onUnmounted(() => {
    speech.stop();
    clearTimeout(timeout);
});

const onFilter: QSelectProps['onFilter'] = (val: string, update) => {
    if (!val || val.length === 0)
        update(() => {
            voiceOptions.value = allVoices;
        });
    else
        update(() => {
            voiceOptions.value = allVoices.filter((v) =>
                v.name.toLowerCase().includes(val.toLowerCase())
            );
        });
};

const speech = useSpeechSynthesis(text, {
    lang: 'zh-CN',
    voice: voice as MaybeRef<SpeechSynthesisVoice>,
    pitch,
    rate,
});

const play = () => {
    if (speech.status.value === 'pause') synth.resume();
    else speech.speak();
};

const pause = () => {
    if (speech.status.value === 'pause') return;
    synth.pause();
};

const stop = () => {
    speech.stop();
};
</script>
<style lang="scss" scoped></style>

<template>
    <Page col-class="col-lg-9 col-12">
        <div class="row q-px-lg q-pt-lg">
            <q-space></q-space>
            <Btn
                color="primary"
                label="添加"
                :throttle="500"
                icon="ri:add-line"
                @click="onAdd"
                class="q-mr-md"
            />
            <Btn
                label="重载"
                plain
                :throttle="500"
                icon="ri:refresh-line"
                @click="onReload"
            />
        </div>

        <transition-group
            appear
            tag="div"
            class="row q-col-gutter-lg q-pa-lg"
            name="list"
            :duration="{ enter: 500, leave: 500 }"
        >
            <div
                class="col-lg-4 col-md-6 col-12"
                v-for="card in cards"
                :key="card.id"
            >
                <Hover>
                    <template #default="{ hover }">
                        <Card :class="{ 'card-active': hover }">
                            <Img :src="card.img" height="300px">
                                <transition
                                    enter-active-class="animated fadeIn"
                                    leave-active-class="animated fadeOut"
                                >
                                    <div
                                        v-show="hover"
                                        class="absolute-bottom text-subtitle1 edge-gradient-bottom"
                                    >
                                        {{ card.label }}
                                    </div>
                                </transition>
                            </Img>
                            <q-separator></q-separator>
                            <q-card-section>
                                <BtnFlat
                                    rounded
                                    class="q-px-sm"
                                    v-for="action in cardActions(card)"
                                    :key="action.icon"
                                    v-bind="action"
                                    @click="action.onClick"
                                />
                            </q-card-section>
                        </Card>
                    </template>
                </Hover>
            </div>
        </transition-group>
    </Page>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import BtnFlat from 'src/components/common/btns/BtnFlat.vue';

interface Card {
    id?: number;
    label?: string;
    description?: string;
    img?: string;
}

onMounted(() => {
    onLoad();
});

const onLoad = () => {
    cards.value = [];
    for (let i = 25; i > 0; i--) {
        cards.value.push({
            id: i,
            label: '卡片' + i,
            description: '描述' + i,
            img: `https://picsum.photos/800?r=${i}`,
        });
    }
};
const onReload = () => {
    cards.value.sort(() => Math.random() - 0.5);
};

const onAdd = () => {
    cards.value.unshift({
        id: cards.value.length + 1,
        label: '卡片' + (cards.value.length + 1),
        description: '描述' + (cards.value.length + 1),
        img: `https://picsum.photos/800?r=${cards.value.length + 1}`,
    });
};

const onDelete = (card: Card) => {
    cards.value = cards.value.filter((c) => c.id !== card.id);
};

const cards = ref<Card[]>([]);
const cardActions = computed(() => (card: Card) => {
    return [
        {
            icon: 'eva-edit-2-outline',
            tooltip: '编辑',
            onClick: () => {
                console.log(card);
            },
        },
        {
            icon: 'ri:eye-line',
            tooltip: '查看',
            onClick: () => {
                console.log(card);
            },
        },
        {
            icon: 'ri:share-line',
            tooltip: '分享',
            onClick: () => {
                console.log(card);
            },
        },
        {
            color: 'negative',
            icon: 'eva-trash-outline',
            tooltip: '删除',
            onClick: () => {
                onDelete(card);
            },
        },
    ];
});
</script>
<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-leave-active {
    position: absolute;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>

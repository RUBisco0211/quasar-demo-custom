<template>
    <v-chart :option="option" autoresize />
</template>
<script setup lang="ts">
import { use } from 'echarts/core';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { useQuasar } from 'quasar';

import useViewsStore from '@/stores/views';
const { colors } = useViewsStore();
const { brandColors, themeColors } = colors;

const $q = useQuasar();

use([
    TooltipComponent,
    LegendComponent,
    TitleComponent,
    PieChart,
    CanvasRenderer,
]);

import { computed } from 'vue';
import { PieChartOption } from '@/models/props';
const props = defineProps<{
    data: PieSeriesOption['data'];
}>();

const option = computed<PieChartOption>(() => {
    return {
        tooltip: {
            trigger: 'item',
            borderRadius: 10,
            borderWidth: 2,
            backgroundColor: $q.dark.isActive
                ? themeColors.dark
                : themeColors.light,
            textStyle: {
                color: $q.dark.isActive
                    ? themeColors.lightText
                    : themeColors.darkText,
            },
        },
        legend: {
            orient: 'vertical',
            bottom: '5%',
            left: '5%',
            icon: 'circle',
            textStyle: {
                fontSize: '15px',
                color: $q.dark.isActive
                    ? themeColors.lightText
                    : themeColors.darkText,
            },
        },
        color: Object.values(brandColors),
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: $q.dark.isActive
                        ? themeColors.dark
                        : themeColors.light,
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                labelLine: {
                    show: false,
                },
                data: props.data,
            },
        ],
    };
});
</script>

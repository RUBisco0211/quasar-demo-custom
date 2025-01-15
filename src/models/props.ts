import type {
    QDateProps,
    QTimeProps,
    QInputProps,
    QSelectProps,
    QColorProps,
} from 'quasar';

// form-item
interface BaseFieldProps {
    icon?: string;
    modelValue?: any;
}
export type InputProps = BaseFieldProps &
    Omit<QInputProps, 'modelValue'> & {
        formItemType: 'input';
    };
export type SelectProps = BaseFieldProps &
    Omit<QSelectProps, 'modelValue'> & {
        formItemType: 'select';
    };
export type DatePickerProps = BaseFieldProps &
    Omit<QInputProps, 'modelValue'> & {
        formItemType: 'datePicker';
        dateProps?: Omit<QDateProps, 'modelValue'>;
    };
export type DateTimePickerProps = BaseFieldProps &
    Omit<QInputProps, 'modelValue'> & {
        formItemType: 'dateTimePicker';
        dateProps?: Omit<QDateProps, 'modelValue'>;
        timeProps?: Omit<QTimeProps, 'modelValue'>;
    };
export type ColorPickerProps = BaseFieldProps &
    Omit<QInputProps, 'modelValue'> & {
        formItemType: 'colorPicker';
        colorProps?: Omit<QColorProps, 'modelValue'>;
    };
export type FormItemProps =
    | InputProps
    | SelectProps
    | DatePickerProps
    | DateTimePickerProps
    | ColorPickerProps;

// util
export type StringIndexedObject = Record<string, any>;

// charts
import { ComposeOption } from 'echarts/core';
import {
    ToolboxComponentOption,
    TooltipComponentOption,
    TitleComponentOption,
    LegendComponentOption,
} from 'echarts/components';
import {
    PieSeriesOption,
    LineSeriesOption,
    LinesSeriesOption,
    BarSeriesOption,
    RadarSeriesOption,
} from 'echarts/charts';

export type BaseChartComponentOption =
    | TooltipComponentOption
    | LegendComponentOption
    | TitleComponentOption
    | ToolboxComponentOption;

export type PieChartOption = ComposeOption<
    PieSeriesOption | BaseChartComponentOption
>;
export type LineChartOption = ComposeOption<
    LineSeriesOption | BaseChartComponentOption
>;
export type LinesChartOption = ComposeOption<
    LinesSeriesOption | BaseChartComponentOption
>;
export type BarChartOption = ComposeOption<
    BarSeriesOption | BaseChartComponentOption
>;
export type RadarChartOption = ComposeOption<
    RadarSeriesOption | BaseChartComponentOption
>;

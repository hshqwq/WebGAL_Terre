import { IDropdownOption } from "@fluentui/react";

export enum OptionType {
  Number,
  Text,
  Boolean,
  Dropdown
}

export interface IOperationOption {
  key: string;
  label?: () => string;
  description?: () => string;
  type?: OptionType;
  max?: number;
  min?: number;
  step?: number;
  defaultValue?: any;
  value?: any;
  placeholder?: string;
  required?: boolean;
  options?: IDropdownOption<any>[]
  selectedKey?: string;
  prefix?: string;
  suffix?: string;
  mask?: string;
  onChange?: (value: string, option: IOperationOption) => string|undefined;
}

type IOperationOptions = IOperationOption[]

export interface IOperation {
  label?: () => string;
  description?: () => string;
  options: IOperationOptions;
}

type IOperations = Record<string, IOperation>;

const operations: IOperations = {
  changeFormat: {
    label: () => '转换格式',
    description: () => '转换的目标格式即为输出文件名的后缀名',
    options: []
  },
  noAudio: {
    label: () => '去除音频',
    options: [
      {key: 'seekInput', description: () => '起始处理位置', type: OptionType.Number, defaultValue: 0, min: 0, step: 5, suffix: 's'},
      {key: 'seek', description: () => '起始输出时间', type: OptionType.Number, defaultValue: 0, min: 0, step: 5, suffix: 's'}
    ]
  },
};

export function getAllOperations() {
  return Object.keys(operations).map(key => {
    const {label, options} = operations[key];
    return {key, text: label ? label() : key, options};
  });
}

export function getOperation(key: string) :IOperation|null {
  return operations[key] || null;
}
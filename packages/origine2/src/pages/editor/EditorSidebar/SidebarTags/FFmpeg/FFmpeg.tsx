import useTrans from "@/hooks/useTrans";
import styles from "../sidebarTags.module.scss";
import ChooseFile from "@/pages/editor/ChooseFile/ChooseFile";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Dropdown, IDropdownOption, Label, Link, MessageBar, MessageBarType, PrimaryButton, Text, TextField, Toggle, optionProperties } from "@fluentui/react";
import axios from "axios";
import { logger } from "@/utils/logger";
import { isArray } from "lodash";
import { IOperation, IOperationOption, OptionType, getAllOperations, getOperation } from "./ffmpeg-operations";

const apiRouter = '/api/ffmpeg/';

const operations = getAllOperations();

export default function FFmpeg() {
  const t = useTrans('editor.sideBar.ffmpeg.');

  const [isCanUseFFmpeg, setIsCanUseFFmpeg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string>('');
  const [availableFormats, setAvailableFormats] = useState<string[]>([]);
  const [operation, setOperation] = useState<string | null>(null);
  const [operationOptions, setOperationOptions] = useState<IOperation | null>(null);

  const fileName = useMemo(() => filePath?.slice(filePath.lastIndexOf('/') + 1), [filePath]);

  useEffect(() => setOperationOptions(getOperation(operation || '')), [operation]);

  const operationOptionsForm = useMemo(() => {
    return operationOptions?.options.map((opt, i) => {
      const props = {
        ...opt,
        type: undefined,
        value: undefined,
        description: undefined,
        label: opt.label ? opt.label() : opt.key,
        onChange: (_ev: unknown, _value: any) => {
          const value: any = opt.type === OptionType.Number
            ? Number(_value)
            : opt.type === OptionType.Boolean
              ? !!_value
              : _value;
          setOperationOptions(prev => {
            const res = opt.onChange ? opt.onChange(value, opt) : value;
            (prev as IOperation).options[i].value = typeof value === typeof res ? res : value;
            return prev;
          });
        }
      };

      let input: ReactNode;

      switch (opt.type) {
      case OptionType.Number: input = <TextField {...props} type="number"/>;
        break;
      case OptionType.Boolean: input = <Toggle {...props} />;
        break;
      case OptionType.Dropdown:
        props.options = [];
        input = <Dropdown {...props as Omit<IOperationOption, 'label' | 'onChange'> & { options: IDropdownOption<any>[] }} />;
        break;
      default: input = <TextField {...props} />;
        break;
      }

      return (<div key={opt.key}>
        {input}
        {!!opt?.description && <Text variant="small">描述: {opt.description()}</Text>}
      </div>);
    });
  }, [operationOptions]);

  const runHandler = () => {
    let optionRequired = true;

    if (optionProperties) {
      for (const opt of operationOptions!.options) {
        if(opt.type === OptionType.Boolean) continue;
        if (opt.required && (opt.type === OptionType.Dropdown ? !opt.selectedKey : !(opt.value || opt.value === 0))) {
          optionRequired = false;
          break;
        }
      }
    }

    if (!outputName || !filePath || !optionRequired) return setErrorMsg('请填写必填项');

    setErrorMsg(null);
  };

  useEffect(() => {
    axios.get(apiRouter + 'prepared')
      .then((res) => {
        setIsCanUseFFmpeg(!!res.data);
      })
      .catch((err) => {
        logger.warn('Can\'t use ffmpeg. Reason: ' + err);
        setIsCanUseFFmpeg(false);
      });
  }, []);

  useEffect(() => {
    if (isCanUseFFmpeg) {
      axios.get(apiRouter + 'availableFormats')
        .then(res =>
          setAvailableFormats(
            isArray(res.data)
              ? res.data.filter(v => typeof v === 'string')
              : availableFormats
          )
        )
        .catch(err => logger.warn('Get available formats failed.'));
    }
  }, [isCanUseFFmpeg]);

  return <div style={{ height: '100%', overflow: 'auto' }}>
    <div className={styles.sidebar_tag_head}>
      <div className={styles.sidebar_tag_title}>{t('title')}</div>
      <div className={styles.sidebar_tag_head_button}>
        <PrimaryButton
          id="createSceneButton"
          text={t('buttons.run')}
          onClick={runHandler}
        />
      </div>
    </div>

    {!!errorMsg && <MessageBar key='error-message-bar'
      messageBarType={MessageBarType.error}
      onDismiss={() => setErrorMsg(null)}>
      {errorMsg}
    </MessageBar>}

    {isCanUseFFmpeg ?
      <div style={{ height: 'auto', maxHeight: 'calc(100% - 45px)', overflow: 'auto' }}>
        <div>
          <div>
            <Label>转换文件</Label>
            <ChooseFile sourceBase=""
              extName={availableFormats || []}
              onChange={(ev) => { 
                if (!ev?.isDir) {
                  setFilePath(ev?.path || null);
                  if(!fileName) setOutputName(ev?.name.slice(ev?.name.lastIndexOf('/') + 1) || '');
                }
              }}
            />
            <Text> 已选择: {fileName || t('file.noChoose')}</Text>
          </div>

          <div>
            <TextField key='output-file-name-input'
              label={t('file.outputName')}
              required
              value={outputName}
              onChange={(ev) => { setOutputName(ev.currentTarget.value); }}
            />
          </div>

          <div>
            <Dropdown label="操作"
              options={operations}
              placeholder="未选择操作"
              selectedKey={operation}
              onChange={(ev, option) => setOperation((option?.key as string) || null)} />
            {!!operationOptions?.description && <Text variant="small">描述: {operationOptions.description()}</Text>}
          </div>

          {operationOptionsForm}
        </div>
      </div>

      // 无法调用ffmpeg时显示
      : <div>
        <Text block variant="large">{t({ key: 'canNotUse', format: { title: t('title') } })}</Text>
        <Link href="">解决方法</Link>
      </div>
    }
  </div>;
}
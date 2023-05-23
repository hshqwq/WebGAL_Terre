import CommonOptions from "../components/CommonOption";
import { ISentenceEditorProps } from "./index";
import styles from "./sentenceEditor.module.scss";
import ChooseFile from "../../ChooseFile/ChooseFile";
import { useValue } from "../../../../hooks/useValue";
import TerreToggle from "../../../../components/terreToggle/TerreToggle";
import useTrans from "@/hooks/useTrans";

export default function Bgm(props: ISentenceEditorProps) {
  const t = useTrans('editor.graphical.sentences.bgm.');
  const bgmFile = useValue(props.sentence.content);
  const isNoFile = props.sentence.content === "";
  const submit = () => {
    props.onSubmit(`bgm:${bgmFile.value};`);
  };

  return <div className={styles.sentenceEditorContent}>
    <div className={styles.editItem}>
      <CommonOptions key="isNoDialog" title={t('options.stop.title')}>
        <TerreToggle title="" onChange={(newValue) => {
          if(!newValue){
            bgmFile.set(t('options.stop.choose'));
          }else
            bgmFile.set('none');
          submit();
        }} onText={t('options.stop.on')} offText={t('options.stop.off')} isChecked={isNoFile} />
      </CommonOptions>
      {!isNoFile && <CommonOptions key="1" title={t('options.file.title')}>
        <>
          {bgmFile.value + "\u00a0\u00a0"}
          <ChooseFile sourceBase="bgm" onChange={(fileDesc) => {
            bgmFile.set(fileDesc?.name ?? "");
            submit();
          }}
          extName={[".mp3", ".ogg", ".wav"]} />
        </>
      </CommonOptions>}
    </div>
  </div>;
}

import styles from "./editorSideBar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/origineStore";
import { sidebarTag } from "../../../store/statusReducer";
import GameConfig from "./SidebarTags/GameConfig/GameConfig";
import Assets from "./SidebarTags/Assets/Assets";
import Scenes from "./SidebarTags/Scenes/Scenes";
import { useEffect, useRef } from "react";
import useTrans from "@/hooks/useTrans";
import FFmpeg from "./SidebarTags/FFmpeg/FFmpeg";


export default function EditorSideBar() {
  const t = useTrans('editor.sideBar.preview.');
  const state = useSelector((state: RootState) => state.status.editor);
  const ifRef = useRef(null);
  useEffect(()=>{
    if(ifRef.current){
      // @ts-ignore
      ifRef!.current!.contentWindow.console.log = function(){};
    }

  });
  return <>
    {(state.currentSidebarTag !== sidebarTag.none || state.showPreview) && <div className={styles.editor_sidebar}>
      {state.showPreview && <div className={styles.preview_container}>
        <div className={styles.preview_top_title_container}>
          <div className={styles.preview_title}>
            {t('title')}
          </div>
          <div onClick={()=>{
            // @ts-ignore
            ( ifRef.current as HTMLIFrameElement).contentWindow.location.reload();
          }
          }
          style={{
            fontWeight: "bold",
            margin: "0 0 0 auto",
            padding: "3px 7px 3px 7px",
            color: "#005caf",
            background: "rgba(0,92,175,0.1)",
            cursor: "pointer",
            borderRadius: "4px"
          }}>
            {t('refresh')}
          </div>
          <div onClick={()=>{
            window.open(`/games/${state.currentEditingGame}`,'_blank');
          }
          }
          style={{
            fontWeight: "bold",
            margin: "0 0 0 5px",
            padding: "3px 7px 3px 7px",
            color: "#005caf",
            background: "rgba(0,92,175,0.1)",
            cursor: "pointer",
            borderRadius: "4px"
          }}>
            {t('previewInNewTab')}
          </div>
        </div>

        {/* eslint-disable-next-line react/iframe-missing-sandbox */}
        <iframe ref={ifRef} id="gamePreviewIframe" frameBorder="0" className={styles.previewWindow}
          src={`/games/${state.currentEditingGame}`} />
      </div>}
      <div style={{height:'100%'}}>
        {state.currentSidebarTag === sidebarTag.gameconfig && <GameConfig />}
        {state.currentSidebarTag === sidebarTag.assets && <Assets />}
        {state.currentSidebarTag === sidebarTag.scenes && <Scenes />}
        {state.currentSidebarTag === sidebarTag.ffmpeg && <FFmpeg />}
      </div>

    </div>
    }
  </>;
}

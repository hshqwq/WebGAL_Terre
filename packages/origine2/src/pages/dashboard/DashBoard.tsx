import {useEffect, useRef} from "react";
import {useValue} from "../../hooks/useValue";
import axios from "axios";
import {logger} from "../../utils/logger";
import {Message, TestRefRef} from "../../components/message/Message";
import styles from "./dashboard.module.scss";
import Sidebar from "./Sidebar";
import TemplateSidebar from "./TemplateSidebar";
import GamePreview from "./GamePreview";
import useTrans from "@/hooks/useTrans";
import About from "./About";
import {WebgalParser} from "../editor/GraphicalEditor/parser";
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent
} from "@fluentui/react-components";
import {LocalLanguage24Filled,LocalLanguage24Regular, bundleIcon, GamesFilled, GamesRegular, AlbumFilled, AlbumRegular} from "@fluentui/react-icons";
import classNames from "classnames";
import useEditorStore from "@/store/useEditorStore";
import { routerMap } from "@/hooks/useHashRoute";
import { api } from "@/api";
import useSWR, { useSWRConfig } from "swr";

// 返回的文件信息（单个）
interface IFileInfo {
  name: string;
  isDir: boolean;
}

// 游戏信息
export interface GameInfo {
  dir: string;
  title: string;
  cover: string;
}

export interface TemplateInfo {
  dir: string;
  title: string;
}

const LocalLanguageIcon = bundleIcon(LocalLanguage24Filled, LocalLanguage24Regular);
const GameIcon = bundleIcon(GamesFilled, GamesRegular);
const AlbumIcon = bundleIcon(AlbumFilled, AlbumRegular);

export default function DashBoard() {
  const { mutate } = useSWRConfig();

  const t = useTrans('editor.topBar.');
  const updateLanguage = useEditorStore.use.updateLanguage();
  const trans = useTrans('dashBoard.');

  const messageRef = useRef<TestRefRef>(null);

  const editor = useEditorStore.use.editor();
  // 左侧栏页签
  const selectedValue = editor;

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    window.location.hash = routerMap[data.value as string] ?? routerMap.game;
  };

  // 当前选中的游戏
  const currentGame = useValue<string | null>(null);

  const setCurrentGame = (e: string | null) => currentGame.set(e);

  // 当前选中的模板
  const currentTemplate = useValue<string | null>(null);

  const setCurrentTemplate = (e: string | null) => currentTemplate.set(e);

  async function createGame(gameName: string) {
    const res = await axios.post("/api/manageGame/createGame", {gameName: gameName}).then(r => r.data);
    logger.info("创建结果：", res);
    messageRef.current!.showMessage(`${gameName} ` + trans('msgs.created'), 2000);
    refreash();
  }

  async function createTemplate(templateName:string) {
    console.log("createTeplate:"+templateName);
    const res = await axios.post("/api/manageTemplate/createTemplate", { templateName: templateName }).then(r => r.data);
    logger.info("创建结果：", res);
    refreash();
  }

  const gameListFetcher = async () => {
    const data = (await api.manageGameControllerGetGameList()).data;
    const gameList = (data as unknown as Array<IFileInfo>).filter(e => e.isDir).map(e => e.name);
    logger.info("返回的游戏列表", gameList);
    const getGameInfoList = gameList.map(
      async (gameName): Promise<GameInfo> => {
        const gameConfigData = (await api.manageGameControllerGetGameConfig(gameName)).data;
        const gameConfig = WebgalParser.parseConfig(gameConfigData as unknown as string);
        return {
          dir: gameName,
          title: gameConfig.find(e => e.command === "Game_name")?.args?.join('') ?? "",
          cover: gameConfig.find(e => e.command === "Title_img")?.args?.join('') ?? "",
        };
      });
    return await Promise.all(getGameInfoList);
  };

  const templateListFetcher = async () => {
    const data = (await api.manageTemplateControllerGetTemplateList()).data;
    const templateList = (data as unknown as Array<IFileInfo>).filter(e => e.isDir).map(e => e.name);
    logger.info("返回的模板列表", templateList);
    const getTemplateInfoList = templateList.map(
      async (templateName) : Promise<TemplateInfo> => {
        const TemplateConfigData = (await api.manageTemplateControllerGetTemplateConfig(templateName)).data as unknown as object;
        return {
          dir: templateName,
          title: 'name' in TemplateConfigData ? TemplateConfigData.name as string : templateName,
        };
      });
    return await Promise.all(getTemplateInfoList);
  };

  const { data: gameList } = useSWR("game-list", gameListFetcher);
  const { data: templateList } = useSWR("template-list", templateListFetcher);

  const refreash = () => {
    setCurrentGame(null);
    mutate('game-list');
    mutate('template-list');
  };

  return(
    <div className={styles.dashboard_container}>
      <div className={styles.topBar}>
          WebGAL Terre
        <Toolbar>
          <About/>
          <Menu>
            <MenuTrigger>
              <ToolbarButton aria-label={t('commandBar.items.language.text')}
                icon={<LocalLanguageIcon/>}>{t('commandBar.items.language.text')}</ToolbarButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={() => updateLanguage('zhCn')}>简体中文</MenuItem>
                <MenuItem onClick={() => updateLanguage('en')}>English</MenuItem>
                <MenuItem onClick={() => updateLanguage('jp')}>日本语</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </Toolbar>
      </div>
      <div className={styles.container_main}>
        <div className={styles.tabListContainer}>
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} vertical size="large">
            <Tab className={classNames(styles.tabItem, selectedValue === 'game' ? styles.active : '')} id="Game"
              icon={<GameIcon fontSize={24}/>} value="game">{t("$游戏")}</Tab>
            <Tab className={classNames(styles.tabItem, selectedValue === 'template' ? styles.active : '')}
              id="Template" icon={<AlbumIcon fontSize={24}/>} value="template">{t("$模板")}</Tab>
          </TabList>
        </div>
        {selectedValue === "game" && <div className={styles.dashboard_main}>
          <Message ref={messageRef}/>
          <Sidebar
            refreash={refreash}
            createGame={createGame}
            setCurrentGame={setCurrentGame}
            currentSetGame={currentGame.value}
            gameList={gameList ? gameList : []}
          />
          {
            currentGame.value && gameList &&
                      <GamePreview
                        currentGame={currentGame.value}
                        setCurrentGame={setCurrentGame}
                        gameInfo={gameList.find(e => e.dir === currentGame.value)!}
                      />
          }
        </div>     
        }
        {selectedValue === "template" && <div className={styles.dashboard_main}>
          <TemplateSidebar
            refreash={refreash}
            createTemplate={createTemplate}
            setCurrentTemplate={setCurrentTemplate}
            currentSetTemplate={currentTemplate.value}
            templateList={templateList ? templateList : []}/>
        </div>}
      </div>
    </div>
  );
}

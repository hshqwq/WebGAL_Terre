import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import 'primereact/resources/themes/fluent-light/theme.css';
import "primereact/resources/primereact.min.css";
import "./primereact.scss";
import { BrandVariants, createLightTheme, createDarkTheme, FluentProvider, makeStyles, Theme } from "@fluentui/react-components";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

let isInitI18n = false;

async function dynamicInit(){
  if(isInitI18n) return;
  // @ts-ignore
  const zhCn = await import(`./locales/zhCn.po`);
  i18n.load('zhCn', zhCn.messages);
  // @ts-ignore
  const en = await import(`./locales/en.po`);
  i18n.load('en', en.messages);
  // @ts-ignore
  const ja = await import(`./locales/ja.po`);
  i18n.load('ja', ja.messages);
  isInitI18n = true;
}

export async function i18nActivate(locale: string) {
  console.log(`Active ${locale}`);
  i18n.activate(locale);
}

dynamicInit().then(renderApp);

const terre: BrandVariants = {
  10: "#020306",
  20: "#111725",
  30: "#152642",
  40: "#17325A",
  50: "#163E73",
  60: "#124B8D",
  70: "#0558A8",
  80: "#2A65B4",
  90: "#4672BC",
  100: "#5D80C3",
  110: "#728ECA",
  120: "#859CD1",
  130: "#98ABD8",
  140: "#ABB9DF",
  150: "#BEC8E7",
  160: "#D0D7EE"
};

const lightTheme: Theme = {
  ...createLightTheme(terre),
};

const darkTheme: Theme = {
  ...createDarkTheme(terre),
};

darkTheme.colorBrandForeground1 = terre[110];
darkTheme.colorBrandForeground2 = terre[120];

initializeIcons();

function renderApp (){
  i18n.activate('zhCn');
  // 不用 StrictMode，因为会和 react-butiful-dnd 冲突
  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <FluentProvider theme={lightTheme} style={{width: '100%', height: '100%'}}>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </FluentProvider>
    // </React.StrictMode>
  );
};

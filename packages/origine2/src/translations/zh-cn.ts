export const zhCn = {
  common: {
    delete: '删除',
    exit: '返回',
    create: '创建',
    revise: '修改',
    cancel: '取消'
  },

  dashBoard: {
    createNewGame: {
      button: '新建游戏',
      dialog: {
        title: '创建新游戏',
        text: '新游戏名',
        defaultName: '新的游戏',
      }
    },
    preview: {
      noneChecked: '当前没有游戏被选中',
      editGame: '编辑游戏'
    },
    titles: {
      gameList: '游戏列表',
    },
    msgs: {
      created: '已创建'
    },
    dialogs: {
      deleteGame: {
        title: "删除游戏",
        subtext: `是否要删除 "{{gameName}}" ？`
      }
    }
  },

  editor: {
    topBar: {
      editing: '正在编辑：',
      editMode: {
        title: '脚本编辑模式',
        onText: '开启，使用脚本编辑',
        offText: '关闭，使用图形编辑'
      },
      commandBar: {
        items: {
          language: {
            text: '语言'
          },
          help: {
            text: '制作指南'
          },
          release: {
            text: "导出游戏",
            items: {
              web: "导出为网页",
              exe: "导出为可执行文件",
              android: "导出为安卓工程文件"
            }
          }
        }
      }
    },

    sideBar: {
      preview: {
        title: '游戏预览',
        refresh: '刷新',
        previewInNewTab: '在新标签页预览'
      },

      file: {
        dialogs: {
          editName: {
            title: '修改文件名',
            text: '新文件名',
          },
          delete: {
            text: '确定删除 "{{name}}" 吗？'
          }
        }
      },

      assets: {
        title: '资源管理',
        supportFileTypes: '当前目录支持的文件类型：',
        buttons: {
          createNewFolder: '新建文件夹',
          openFolder: '打开此游戏的资源文件夹',
          rename: '重命名',
          deleteSure: '确认删除',
          upload: '上传',
          uploadAsset: '上传资源'
        },
        folders: {
          animation: '动画',
          background: '背景',
          bgm: '音乐',
          figure: '立绘',
          scene: '场景',
          tex: '纹理',
          video: '视频',
          vocal: '语音'
        }
      },

      gameConfigs: {
        title: '游戏配置',
        options: {
          name: '游戏名称',
          id: '游戏识别码',
          packageName: '游戏包名',
          bg: '标题背景图片',
          bgm: '标题背景音乐',
        }
      },

      scenes: {
        title: '场景管理',
        dialogs: {
          create: {
            button: '新建场景',
            title: '创建新场景',
            text: '新场景名',
          }
        }
      },

      ffmpeg: {
        title: '媒体工厂',
        canNotUse: '无法使用{{title}}功能',
        file: {
          noChoose: '未选择文件',
          outputName: '输出文件名'
        },
        buttons: {
          run: '开始执行'
        }
      }
    },

    mainArea: {
      noFileOpened: '目前没有打开任何文件',
      canNotPreview: '该文件类型不支持预览'
    },

    graphical: {
      buttons: {
        delete: '删除本句',
        addForward: '本句前插入句子',
        add: '添加语句'
      },

      sentences: {
        say: {
          title: '普通对话',
          initText: "角色名，留空以继承上句:对话;",
          descText: '添加一句对话，可以附带语音',
          options: {
            speaker: {
              placeholder: {
                voiceover: "旁白模式，无角色名",
                role: "角色名，留空以继承上句"
              }
            },
            dialogue: {
              placeholder: "对话"
            },
            voiceover: {
              title: "旁白模式",
              on: "不显示角色名",
              off: "显示角色名"
            },
            vocal: {
              title: "语音"
            }
          }
        },
        common: {
          options: {
            goNext: {
              title: "连续执行",
              on: "本句执行后执行下一句",
              off: "本句执行后等待"
            }
          }
        },
        bgm: {
          title: "背景音乐",
          initText: "bgm:选择背景音乐;",
          descText: '启动、切换或停止背景音乐的播放',
          options: {
            stop: {
              title: "停止 BGM",
              on: "结束当前 BGM 的播放",
              off: '正常播放 BGM',
              choose: '选择背景音乐'
            },
            file: {
              title: '背景音乐文件',
            }
          }
        },
        changeBg: {
          title: "切换背景",
          initText: 'changeBg: 选择背景图片;',
          descText: '切换背景图片',
          options: {
            hide: {
              title: "关闭背景",
              on: "关闭背景",
              off: "显示背景",
              choose: "选择背景图片",
            },
            file: {
              title: '背景文件'
            }
          }
        },
        changeCallScene: {
          title: "调用场景",
          initText: "callScene:选择场景文件;",
          descText: '调用一段场景文件，在结束后返回父场景',
          options: {
            file: {
              title: "场景文件",
            },
            call: {
              title: '调用/切换场景',
              on: "调用场景，新场景结束后返回父场景",
              off: "切换场景，新场景直接替换父场景"
            }
          }
        },
        changeFigure: {
          title: '切换立绘',
          initText: "changeFigure:选择立绘文件;",
          descText: '添加或切换指定位置的立绘',
          options: {
            hide: {
              title: "关闭立绘",
              on: "关闭立绘",
              off: '显示立绘',
              choose: '选择立绘文件'
            },
            file: {
              title: '立绘文件',
            },
            position: {
              title: "立绘位置",
              options: {
                left: '左侧',
                center: '中间',
                right: '右侧'
              }
            },
            id: {
              title: "立绘ID（可选）",
              placeholder: "立绘 ID"
            }
          }
        },
        changeScene: {
          title: "切换场景",
          initText: "changeScene:选择场景文件;",
          descText: '切换到另一个场景文件，并清除当前场景',
        },
        setAnime: {
          title: "设置动画",
          initText: "setAnimation:选择动画文件;",
          descText: '为立绘或背景图片设置动画效果',
          options: {
            tips: {
              set: "提示：先设置立绘/背景，再应用动画，否则找不到目标。",
              select: "选择一个动画文件以应用，其中 animationTable 是动画定义，不要选择。"
            },
            file: {
              title: "选择动画"
            },
            preparedTarget: {
              title: "使用预设目标",
              on: "使用预设的作用目标，如果设置了id则不生效",
              off: "手动输入 ID",
              choose: {
                title: "选择预设目标",
                options: {
                  figLeft: "左侧立绘",
                  figCenter: "中间立绘",
                  figRight: "右侧立绘",
                  bgMain: "背景图片"
                }
              }
            },
            targetId: {
              title: "输入目标 ID",
              placeholder: "立绘 ID",
            }
          }
        },
        video: {
          title: "播放视频",
          initText: "playVideo:选择视频文件;",
          descText: '播放一小段视频',
          options: {
            file: {
              title: "视频文件"
            }
          }
        },
        effect: {
          title: "使用特效",
          initText: "pixiPerform:snow;",
          descText: '为当前的舞台添加特殊效果',
          options: {
            clear: {
              title: "清除特效",
              on: "清除特效",
              off: "使用特效"
            },
            usePrepared: {
              title: "使用预制特效",
              on: "使用引擎内置的特效",
              off: "使用自定义特效",
              effects: {
                snow: "下雪",
                rain: "下雨"
              }
            },
            useUser: {
              title: "自定义特效名称",
            },

          }
        },
        clearEffect: {
          title: "清除特效",
          initText: "pixiInit;",
          descText: '清除当前舞台的特殊效果',
        },
        intro: {
          title: "黑屏文字",
          initText: "intro:;",
          descText: '黑屏显示一段文字，用于独白或引出场景',
          options: {
            value: {
              placeholder: "Intro 文本",
            },
            add: {
              button: '添加新行'
            }
          }
        },
        miniAvatar: {
          title: "角落头像",
          initText: "miniAvatar:选择小头像;",
          descText: '在对话框的左下角显示一个小头像',
          options: {
            close: {
              title: "关闭小头像",
              on: "关闭小头像",
              off: "展示小头像",
              choose: '选择小头像'
            },
            file: {
              title: "小头像文件",
            }
          }
        },
        setTextBox: {
          title: "文本显示",
          initText: "setTextbox:hide;",
          descText: '控制是否要显示文本框',
          options: {
            hide: {
              title: "隐藏文本框",
              on: "隐藏文本框",
              off: "显示文本框"
            }
          }
        },
        choose: {
          title: "分支选择",
          initText: "choose:选项:选择场景文件;",
          descText: '通过选项进入不同的场景',
          delete: '删除本句',
          option: {
            name: '选项名称',
            option: '选项',
            chooseFile: '选择场景文件'
          },
          add: '添加语句',
        },
        soundEffect: {
          title: "效果声音",
          initText: "playEffect:选择效果音文件;",
          descText: '播放一段效果音',
          options: {
            stop: {
              title: "关闭效果音",
              on: "关闭效果音",
              off: "播放效果音",
              choose: "选择效果音文件"
            },
            file: {
              title: '效果音文件',
            },
            id: {
              title: "效果音 ID（输入以使效果音循环，后面再用这个 id 来关闭）",
              placeholder: "效果音 ID"
            }
          }
        },
        unlockCg: {
          title: "鉴赏图片",
          initText: "unlockCg:;",
          descText: '添加一张图片到 CG 鉴赏界面',
          options: {
            tips: {
              afterEdit: "提示：在编辑结束后，如果发现有失效的鉴赏 CG/BGM ，在 WebGAL 游戏界面的选项中选择清除全部数据以清空。"
            },
            type: {
              title: "解锁鉴赏类型",
              options: {
                cg: "CG",
                bgm: "BGM"
              }
            },
            file: {
              title: "鉴赏资源文件"
            },
            name: {
              title: "解锁名称",
              placeholder: "解锁的 CG 或 BGM 名称"
            }
          }
        },
        unlockBgm: {
          title: "鉴赏音乐",
          initText: "unlockBgm:;",
          descText: '添加一首音乐到音乐鉴赏界面',
        },
        comment: {
          title: "单行注释",
          initText: ";注释",
          descText: '添加一行注释',
          options: {
            value: {
              title: "注释",
              tip: '注释仅在编辑时可见，游戏中不会执行',
            }
          }
        },
        end: {
          title: "结束游戏",
          initText: "end;",
          descText: '结束当前游戏并回到标题画面',
          tip: '此指令将结束游戏',
        },
        unknown: {
          title: "未识别",
          options: {
            tip: {
              title: "未识别的指令",
              text: '该指令没有被识别，请打开脚本编辑模式以手动编辑'
            }
          }
        }
      },

      components: {
        addSentence: {
          dialogs: {
            add: {
              text: {
                forward: "在所选句子前添加一条语句",
                backward: '在场景末尾添加一条语句'
              }
            }
          }
        },
        template: {
          title: "编辑组件",
          text: '在这里放置编辑组件'
        }
      },
    },

    fileChoose: {
      cancel: "取消选择",
      choose: "选择文件",
    }
  },
};
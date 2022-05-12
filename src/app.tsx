import { EditorRenderer } from 'alex';

const App = () => {
  const group = 'Gitlink';
  const repo = 'forgeplus';
  return (
    <EditorRenderer
      appConfig={{
        // 工作空间目录
        workspaceDir: `${group}/${repo}`,
        defaultPreferences: {
          // 默认主题，如果暗色为 ide-dark
          'general.theme': 'ide-light',
          // 编辑器只读
          'editor.forceReadOnly': true,
          // 最后一行禁止继续滚动
          'editor.scrollBeyondLastLine': false,
        },
      }}
      runtimeConfig={{
        // 业务标识
        biz: 'gitlink',
        // 在 editor 下推荐传 null，此时不会持久化缓存工作空间数据
        scenario: null,
        // 启动时显示的编辑器，editor 下传 none 即可
        startupEditor: 'none',
        // 隐藏 editor tab
        hideEditorTab: true,
      }}
      editorConfig={{
        stretchHeight: true,
        disableEditorSearch: true,
      }}
      // 文档模型，以下数据变更时会更新打开的编辑器
      documentModel={{
        // 类型，code 下为 code，保持不变
        type: 'code',
        // 分支或 tag
        ref: 'master',
        // 仓库群组和用户
        owner: group,
        // 仓库名
        name: repo,
        // 仓库文件路径
        filepath: 'robots.ts',
        // 读取文件接口
        readFile: async (filepath: string) => {
          if (!filepath) {
            return;
          }
          // 请求接口
          const res = await fetch(
            'https://gist.githubusercontent.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js'
          );
          return res.arrayBuffer();
        },
        // 文件编码，和标准工作空间支持编码类型一致，简单场景只传 utf8 或 gbk 即可
        encoding: 'utf8',
        onFilepathChange: (changedFilepath: string) => {
          if (changedFilepath) {
            console.log(`路由跳转到 ${changedFilepath}`);
          }
        },
        // 指定当前选中多少行
        // lineNumber: [0, 1],
        onLineNumberChange: (line: string) => {
          if (typeof line === 'number') {
            console.log(`#L${line}`);
          } else {
            console.log(`#L${line[0]}-${line[1]}`);
          }
        },
      }}
    />
  );
};

export default App;

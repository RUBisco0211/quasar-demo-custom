import { boot } from 'quasar/wrappers';
import hljs from 'highlight.js';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// vue-cropper组件和css
import 'vue-cropper/dist/index.css';
import VueCropper from 'vue-cropper';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
});
VMdPreview.use(githubTheme, { Hljs: hljs });

export default boot(({ app }) => {
    app.use(VueCropper).use(VMdEditor).use(VMdPreview);
});

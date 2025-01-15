import { boot } from 'quasar/wrappers';

// vue-cropper组件和css
import 'vue-cropper/dist/index.css';
import VueCropper from 'vue-cropper';

export default boot(({ app }) => {
    app.use(VueCropper);
});

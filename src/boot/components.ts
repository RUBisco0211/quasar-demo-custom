import { boot } from 'quasar/wrappers';

import Header from 'src/components/layouts/Header.vue';
import LogoItem from 'src/components/common/LogoItem.vue';
import BtnFlat from 'src/components/common/btns/BtnFlat.vue';
import Btn from 'src/components/common/btns/Btn.vue';
import DarkToggle from 'src/components/common/DarkToggle.vue';
import FormItem from 'src/components/common/form/FormItem.vue';
import Page from 'src/components/layouts/Page.vue';
import SideNavMenu from 'src/components/layouts/SideNavMenu.vue';
import BreadCrumbs from 'src/components/common/BreadCrumbs.vue';
import GlobalUserItem from 'src/components/common/GlobalUserItem.vue';
import Cropper from 'src/components/utils/Cropper.vue';
import Img from 'src/components/common/Img.vue';
import Empty from 'src/components/common/Empty.vue';
import Hover from 'src/components/common/Hover.vue';
import RichEditor from 'src/components/common/form/RichEditor.vue';
import OtpInput from 'src/components/common/form/OtpInput.vue';
import FormDialog from 'src/components/common/dialogs/FormDialog.vue';
import Card from '@/components/common/Card.vue';
import Authority from '@/components/common/Authority.vue';
import Result from '@/components/common/Result.vue';

const globalComponents = {
    Header,
    Page,
    SideNavMenu,

    FormItem,
    Btn,
    BtnFlat,
    Card,
    Img,
    Empty,
    BreadCrumbs,
    Hover,
    Authority,
    Result,
    FormDialog,

    OtpInput,
    RichEditor,
    DarkToggle,
    LogoItem,
    GlobalUserItem,
    Cropper,
};

export default boot(({ app }) => {
    Object.entries(globalComponents).forEach(([name, component]) => {
        app.component(name, component);
    });
});

<template>
    <Card style="width: 450px">
        <q-card-section>
            <LogoItem></LogoItem>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section class="q-pa-lg">
            <q-form @submit.prevent="">
                <FormItem
                    v-for="item in formItems"
                    :key="item.name"
                    v-bind="item"
                    v-model="loginInfo[item.name as string]"
                ></FormItem>
                <div class="row justify-between items-center q-mb-sm">
                    <q-checkbox
                        label="记住我"
                        dense
                        checked-icon="ri:checkbox-circle-line"
                        unchecked-icon="ri:checkbox-blank-circle-line"
                        v-model="rememberMe"
                    ></q-checkbox>
                    <BtnFlat
                        label="忘记密码"
                        dense
                        color="primary"
                        class="col-3"
                    ></BtnFlat>
                </div>
                <Btn
                    type="submit"
                    class="full-width q-mb-md"
                    icon="ri:login-box-line"
                    label="登录"
                    color="primary"
                ></Btn>
                <Btn
                    class="full-width q-mb-md"
                    icon="ri:github-fill"
                    plain
                    color="primary"
                    no-caps
                    label="使用 GitHub 登录"
                ></Btn>
                <Btn
                    class="full-width q-mb-md"
                    icon="ri:google-fill"
                    plain
                    color="primary"
                    no-caps
                    label="使用 Google 登录"
                ></Btn>
                <BtnFlat
                    class="full-width"
                    label="没有账号？去注册"
                    color="primary"
                ></BtnFlat>
            </q-form>
        </q-card-section>
    </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormItem from 'src/components/common/form/FormItem.vue';
import { FormItemProps, StringIndexedObject } from '../../models/props';
import Btn from 'src/components/common/btns/Btn.vue';
import BtnFlat from 'src/components/common/btns/BtnFlat.vue';
const formItems: FormItemProps[] = [
    {
        formItemType: 'input',
        name: 'email',
        label: '邮箱',
        rules: [(val: string) => !!val || '请输入邮箱'],
        icon: 'eva-email-outline',
    },
    {
        formItemType: 'input',
        type: 'password',
        name: 'password',
        label: '密码',
        rules: [(val: string) => !!val || '请输入密码'],
        icon: 'eva-lock-outline',
    },
];
const loginInfo = ref<StringIndexedObject>({
    email: '',
    password: '',
});
const rememberMe = ref(false);
</script>

import { defineStore } from 'pinia';
import { User } from 'src/models/service';
import { ref } from 'vue';

export default defineStore(
    'user',
    () => {
        const user = ref<User>({
            id: 1,
            username: 'admin',
            password: 'admin',
            token: '123456',
            name: 'Admin',
            avatar: 'https://avatars.githubusercontent.com/u/113019222?v=4',
            roles: ['admin', 'user'],
        });
        return {
            user,
        };
    },
    {
        persist: true,
    }
);

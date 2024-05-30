import store from "@/store";

export default { // 这里的this指向会变成Request类
    login(params) {
        console.log('发起请求');
        return this.$post('/api/v1/base/access_token', params);
    },
    // 获取用户登录后需要的全部数据
    getUserData() {
        let queue = [
            this.$api('user').userinfo(),
            this.$api('user').menu(),
        ];
        return Promise.all(queue);
    },
    userinfo() {
        return this.$get('/api/v1/base/userinfo', );
    },
    menu() {
        return this.$get('/api/v1/base/usermenu', );
    },
    
};
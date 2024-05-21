import Vue from "vue";
import router from "../../../src/router";
import store from "../../../src/store";
export default {
    host: '', // 这个地方暂时没用，还不知道怎么加入进去
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: '/auth/',
    header: { 'content-type': 'application/json; charset=utf-8', "Access-Control-Allow-Origin": "*", "Cache-Control": "no-cache" },
    timeout: 20000,
    url: {
    },
    getUrl(key) {
        let url = this.url[key] || '';
        return url;
    },
    willRequest(config) { // 预处理token逻辑
        let token = store.getters.token;
        console.log('请求前token', token);
        if (token) {
            if (!config.headers) config.headers = {}
            config.headers['Token'] = token;
        }
        console.log('willRequest', config);
        return config;
    },
    didRequest(response, error = false) {
        if (response.code == 201) { // TODO: 登录过去 弹出
            store.dispatch('user/logout');
            return;
        }
        if (response.code === 200) {
            return Promise.resolve(response);
        }
        try {
            //执行代码  不报错则 正常执行 不会进入下面的catch
            return Promise.reject(response);
        } catch(err){
            //当上面的代码出错时 这里可以捕获到错误信息  
            console.error('didRequest Error ====> ', err);
        }
    },
};
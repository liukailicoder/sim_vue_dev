/*
 * @Author: 王博然 
 * @Date: 2020-06-22 09:34:09 
 * @Last Modified by: R
 * @Last Modified time: 2021-08-20 15:16:48
 */
import axios from 'axios'
import urlConfig from './URLConfig'
// 创建请求类
const request = axios.create({
    baseURL: urlConfig.baseURL,
    timeout: urlConfig.timeout,
    headers: urlConfig.headers,
});
// 请求发出前
request.interceptors.request.use(config => {
    console.log('will Request', config);
    if (urlConfig.willRequest)
        config = urlConfig.willRequest(config);
    console.log('will Request end', config);
    return config
}, error => {
    return Promise.reject(error)
});
// 响应回调前
request.interceptors.response.use(response => {
    console.log('did Request', response);
    if (response.status == 200) {
        let data = response.data;
        if (urlConfig.didRequest)
            return urlConfig.didRequest(data);
        return response.data;
    } else {
        if (urlConfig.didRequest)
            return urlConfig.didRequest(response);
        return Promise.reject(response);
    }
}, (error, e) => {
    console.log('这报错', error);
    try {
        if (urlConfig.didRequest)
            return urlConfig.didRequest((error.response||{}).data || error, true);
    } catch (error) {
        if (urlConfig.didRequest)
            return urlConfig.didRequest(error, true);
    }
    return Promise.reject(error)
});
// 填充拓展方法
Object.defineProperty(request, '$get', {
    get() { return (...args) => { args = requestRedirectParam(args, false); return request.get.apply(request, args); }; }, set(value) { }
}
);
Object.defineProperty(request, '$delete', {
    get() { return (...args) => { args = requestRedirectParam(args, false); return request.delete.apply(request, args); }; }, set(value) { }
}
);
Object.defineProperty(request, '$put', {
    get() { return (...args) => { args = requestRedirectParam(args, true); return request.put.apply(request, args); }; }, set(value) { }
}
);
Object.defineProperty(request, '$post', {
    get() { return (...args) => { args = requestRedirectParam(args, true); return request.post.apply(request, args); }; }, set(value) { }
}
);

Object.defineProperty(request, '$api', {
    get() {
        return function (moduleName) {
            try {
                let module = require(`./modules/${moduleName}.js`);
                const api = {};
                Object.keys(module.default).forEach(key => {
                    Object.defineProperty(api, key, {
                        get() {
                            return (...args) => {
                                try {
                                    return module.default[key].apply(request, args);
                                } catch (error) {
                                    console.log(error);
                                }
                            };
                        }
                    })
                });
                return api;
            } catch (error) {
                throw new Error(`未定义的request模块${moduleName}.js`)
            }

        }
    },
});
function requestRedirectParam(args, hasData = true) {
    let url = args[0];
    if (url) {
        args[0] = url;
    }
    let handleIndex = hasData ? 2 : 1;
    let handle = args[handleIndex] || {};
    if (handle && handle.getSource) {
        let CancelToken = axios.CancelToken;
        let source = CancelToken.source();
        handle.cancelToken = source.token;
        handle.getSource(source);
        delete handle.getSource;
    }
    if (handle.append) {
        args[0] += handle.append || '';
        delete handle.append;
    }
    args[handleIndex] = handle;
    // TODO:这里先废弃吧，后面再看看怎么在config中携带参数
    // let param    = args[2] || {}; 
    // param.urlKey = args[0];
    // args[2]      = param;
    return args;
}
const requestMounting = {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$request', {
            value: request,
            writable: false
        });
        Object.defineProperty(Vue.prototype, '$api', {
            value: request.$api,
            writable: false
        });
    }
};
export { requestMounting, request };

// api根据模块放置
// Object.defineProperty(uni.$R, 'api', )
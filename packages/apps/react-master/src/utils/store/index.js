const CreateStore = function (unlocal = false, opts = {}) {
    this.unlocal = unlocal;
    // 通用属性
    const { maxLength, shouldFetch, expireTime, plugins } = opts || {}
    this.maxLength = maxLength || 30; // 最大长度
    this.shouldFetch = shouldFetch || false; // 是否需要请求api
    this.expireTime = expireTime || NaN; // 过期时间
    this.plugins = plugins || []; // 插件
    this.observe(); // 业务层 改动逻辑在此处
}

CreateStore.prototype.observe = function () {
    const context = this;

    this.__mock_storage = new Proxy({}, {
        get(target, propKey, receiver) {
            let result;
            if(!context.unlocal){
                // 如果选用本地存储方式，直接调用API getItem
                result = (context.getItem(propKey) || Reflect.get(target, propKey, receiver))
            } else {
                result = Reflect.get(target, propKey, receiver)
            }
            return result
        },
        set(target, propKey, value, receiver) {
            let _value = value;
            // 数据要劫持一下，因为我还有提供更通用的能力（maxLength, expireTime...)
            if(value instanceof Array && value.length > context.length) {
                _value = value.slice(0, maxLength);
            }

            // 通用能力封装 按需添加
            if(context.expireTime) {
                // 如果有过期时间 可以直接删除当前propkey的值
            }

            if(context.shouldFetch) {
                // 按需 掉接口
            }

            if(!context.unlocal) {
                context.setItem(propKey, _value)
            }

            return Reflect.set(target, propKey, value, receiver)
        }
    })
}

CreateStore.prototype.setItem = function (type, data) {
    const dataJson = JSON.stringify(data);
    window[this.storageMethod].setItem(type, dataJson);
}

CreateStore.prototype.set = function (type, data) {
    this.__mock_storage[`${this.bizKey}_${type}`] = data
}

CreateStore.prototype.getItem = function (type) {
    // 判断window是否存在
    const data = window[this.storageMethod].getItem(type);
    let dataJson;
    try {
        dataJson = JSON.parse(data)
    } catch(e) {
        throw new Error(e)
    }

    return dataJson;
}

CreateStore.prototype.get = function (type) {
    return this.__mock_storage[`${this.bizKey}_${type}`]
}

CreateLocalStore = function (bizKey, ...rest) {
    CreateStore.apply(this, rest);
    this.bizKey = bizKey; // 增加特殊标识 防止相同项目变量名重复
    this.storageMethod = 'localStorage';
}

// 组合寄生继承 解决了复制静态属性变量的问题
CreateLocalStore.prototype = Object.create(CreateStore.prototype);
CreateLocalStore.prototype.constructor = CreateLocalStore;

CreateSessionStore = function (bizKey, ...rest) {
    CreateStore.apply(this, rest);
    this.bizKey = bizKey;
    this.storageMethod = 'sessionStorage';
}

CreateSessionStore.prototype = Object.create(CreateStore.prototype);
CreateSessionStore.prototype.constructor = CreateSessionStore;

export const localStorage = new CreateLocalStore("zhstorage")
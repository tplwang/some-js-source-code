export let _Vue;
export function install (Vue) {
    // 确保 install 执行一次
    if (install.installed && _Vue === Vue) {
        return;
    }
    install.installed = true;
    _Vue = Vue;

    const isDef = v => v !== undefined;

    const registerInstance = (vm, callVal) => {
        let i = vm.$options._parentVnode;
        if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerInstance)) {
            i(vm, callVal);
        }
    }

    // 把 beforeCreate 和 destroy 钩子 mixin 进每一个组件中
    Vue.mixin({
        beforeCreate() {
            if (isDef(this.$options.router)) {
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this);
                // 把 this._route 变成响应式对象。
                Vue.util.definReative(this, '_router', this._router.history.current)
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
            registerInstance(this, this);
        },
        destroyed() {
            registerInstance(this);
        }
    })

    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router;
        }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot.route;
        }
    })

    // 定义全局组件
    Vue.componetent('RouterView', View);
    Vue.componetent('RouterLink', Link);

    const strats = Vue.config.optionMergeStrategies;
    strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;

}
function Vue(options) {
    if (process.env.NODE_ENV !== 'production' && 
        !(this instanceof Vue)) {
            warn('Vue is a constructor and should be called with the `new` keyword')
        }
        this._init(options);
}

Vue.prototype._init = function (options ?: Object) {
    const vm: Component = this;
    vm._uid = uid++;

    let startTag, endTag;
    if (process.env.NODE_ENV !== 'production' && config.performace && mark) {
        startTag = `vue-perf-start:${vm._uid}`;
        endTag = `vue-perf-end:${vm._uid}`;
        mark(startTag);
    }

    vm._isVue = true;
    if (option && options._isComponent) {
        initInternalComponent(vm, options);
    } else {
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        )
    }

    if (process.env.NODE_ENV !== 'production') {
        initProxy(vm)
    } else {
        vm._renderProxy = vm;
    }

    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreated');
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook(vm, 'created');

    if (process.env.NODE_ENV !== 'production' && config.performace && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure
    }
}
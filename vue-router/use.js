export function initUse (Vue: GlobalAPI) {
    Vue.use = function(plugin: Function | Object) {
        const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
        //  判断这个插件是不是已经被install过了
        if (installedPlugins.indexOf(plugin) > 1) {
            return this;
        }

        const args = toArray(arguments, 1);
        // 把 Vue 放进第一个参数中，之后会传进插件的install方法中
        args.unshift(this);
        //  判断并执行插件的 install 方法
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
            plugin.apply(null, args);
        }
        installedPlugins.push(plugin);
        return this;
    }
}
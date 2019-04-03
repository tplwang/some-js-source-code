export default class VueRouter {
    static install: () =>void;
    static version: string;


    constructor (options: RouterOptions = {}) {
        this.app = null; // 根 Vue 实例
        this.apps = []; // 保存持有 $options.router 属性的 Vue 实例
        this.options = options; // 保存传入的路由配置
        this.beforreHooks = []; // 一些钩子函数
        this.resolveHooks = []
        this.afterHooks = []
        // 路由匹配器
        this.matcher = createMatcher(options.routes || [], this)

        // 默认 hash 模式
        let mode = optiosn.mode || 'hash';
        // 当浏览器不支持 history.pushState 的情况下，是否退回 hash 模式
        this.fallback = mode === 'history' && !supportsPushState 
            && options.fallback !== false;
        if (this.fallback) {
            mode = 'hash';
        }
        if (!inBrowser) {
            mode = 'abstract';
        }
        this.mode = mode;

        switch(mode) {
            case 'history':
                this.history = new HTML5History(this, options.base);
                break;
            case 'hash':
                this.history = new HashHistory(this, options.base, this.fallback);
                break;
            case 'abstract':
                this.history = new AbstractHistory(this, options.base);
                break;
            default: 
                if (process.env.NODE_ENV !== 'production') {
                    assert(false, `invalid mode: ${mode}`);
                }
        }
    }

    match(
        raw: RawLocation,
        current?: Route,
        redirectedFrom?: Location
    ): Route {
        return this.matcher.match(raw, current, redirectedFrom);
    }

    init (app: any) {
        process.env.NODE_ENV !== 'production' && assert(
            install.installed,
            `not installed. Make sure to call \`Vue.use(VueRouter)\`` + 
            `before creating root instance.`
        )

        this.apps.push(app);

        if (this.app) {
            return
        }

        this.app = app;

        const history = this.history;

        if (history instanceof HTML5History) {
            history.transitionTo(history.getCurrentLocation())
        } else if (history instanceof HashHistory) {
            const setupHashListener = () => {
                history.setupListeners();
            }
            history.transitionTo(
                history.getCurrentLocation(),
                setupHashListener,
                setupHashListener
            )
        }

        history.listen(route => {
            this.apps.forEach((app) => {
                app._route = route;
            })
        })
    }
}
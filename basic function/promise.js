// promise function
function myPromise(fn) {
    var state = 'pending';  // record the state
    var value = null;
    var callbacks = []; // record callback fucntion

    // define .then function
    this.then = function(onFulfilled, onRejected) {
        // the then function will also return a promise
        return new myPromise(function(resolve, reject) {
            handle({
                onFulfilled: onFulfilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            });
        });
    }

    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        var cb = state === 'fulfilled' ? callback.onFulfilled : callback.onRejected;
        var ret;
        if (cb === null) {
            cb = state === 'fulfilled' ? callback.resove : callback.reject;
            cb(value);
            return;
        }
        try {
            ret = cb(value);
            callback.resolve(ret);
        } catch (e) {
            callback.reject(e);
        }
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve, reject);
                return;
            }
        }
        value = newValue;
        state = 'fulfilled';
        execute();
    }

    function reject(reason) {
        state = 'rejected';
        value = reson;
        execute();
    }

    function execute() {
        setTimeout(function() {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    }

    fn(resolve, reject);
}
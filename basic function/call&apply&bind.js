// call function
Function.prototype.myCall = function(context) {
    
    if (typeof this !== 'function') {
        throw new TypeError('error');
    }
    // if not have user-defined context, the context will be window
    context = context || window;
    context.fn = this;
    const args = [...arguments].slice(1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

// apply function
Function.prototype.myApply = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }
    context = context || window;
    context.fn = this;
    let result;
    // different from call
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
    delete context.fn;
    return result;
}

// bind function
Function.prototype.myBind = function(context) {
    if (typeof this !== 'function') {
        throw new TypeError('error');
    }
    const _this = this;
    const args = [...arguments].slice(1);
    //return a function
    return function F() {
        if (this instanceof F) {
            return new _this(...args, ...arguments);
        }
        return _this.apply(context, args.concat(...arguments));
    }
}
// debounce
function debounce(fn, delay) {
    var timer = null;
    return fucntion() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(fucntion() {
            fn.apply(context, args);
        }, delay);
    }
}

// throttle
function throttle(fn, threshhold) {
    var last = null;
    var timer = null;
    return function() {
        var context = this;
        var args = arguments;
        var now = +new Date();
        if (last && now < last + threshold) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}

// enhance debounce&throttle
function throttle(fn, delay) {
    let last = 0, timer = null;

    return function() {
        let context = this;
        let args = arguments;
        let now = +new Date();
        if (now - last < delay) {
            clearTimeout(timer);
            timer = setTimeout(function() {
                last = now;
                fn.apply(context, args);
            }, delay);
        } else {
            last = now;
            fn.apply(context, args);
        }
    }
}
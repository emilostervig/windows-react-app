export const throttle = function(fn, ms) {
    this.timeout = null;
    this.exec = function() {
        fn.apply();
    }
    this.clear = function(){
        if(this.timeout == undefined){
            this.timeout = null
        } else{
            this.timeout = clearTimeout(this.timeout);
        }
    }
    if(fn !== undefined && ms !== undefined) {
        this.timeout = setTimeout(this.exec, ms)
    } else {
        console.error('callback function and the timeout must be supplied')
    }
    // API to clear the timeout
    throttle.clearTimeout = function() {
        this.clear();
    }
}


export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
  
        var callNow = immediate && !timeout;
  
        clearTimeout(timeout);
  
        timeout = setTimeout(function() {
  
            timeout = null;
  
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
  
        if (callNow) func.apply(context, args);
    }
}
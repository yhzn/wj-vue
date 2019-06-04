export let isBasic = (it) => {
    return it===null || ( typeof it !== "object" && typeof it !== "array");
}
export let clone =  (it) => {
    if(isBasic(it)){
        return it;
    }
    let result = Array.isArray(it) ? [] : {};
    for (let i in it){
        result[i]=clone(it[i]);
    }
    return result;
}

let is = (it,type) => {
    return ({}).toString.call(it)===`[object ${type}]`;

}

export let isFunction = (it) => {
    return is(it,'Function')

}

export let countDown = (ctx,buttonText,fn=()=>{},sec=60) => {
    if(ctx[buttonText+"Flag"]){
        return false;
    }
    ctx[buttonText+"Flag"]=true;
    fn();
    ctx[buttonText]=`${sec} s后重新获取`;
    ctx.timer=setInterval(()=>{
        ctx[buttonText]=`${--sec} s后重新获取`;
        if(sec<0){
            clearInterval(ctx.timer);
            ctx[buttonText+"Flag"]=false;
            ctx[buttonText]="获取验证码";
        }
    },1000)
}
export let setCookie = function (name, value, day) {
    if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        let expires = day * 24 * 60 * 60 * 1000;
        let date = new Date(+new Date()+expires);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    }else{
        document.cookie = name + "=" + escape(value);
    }
};

export let getCookie = (name) => {
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    let arr= document.cookie.match(reg);
    if (arr){
        return unescape(arr[2]);

    }else{
        return null
    }
};
export let delCookie = function (name) {
    setCookie(name, ' ', -1);
};
export let getUrlParam = function (name) {
    let after = window.location.hash;
    let index =after.indexOf('?');
    if(index === -1) { //如果url中没有传参直接返回空
        return null
    }
    //key存在先通过search取值如果取不到就通过hash来取
    if(after){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = after.slice(index+1).match(reg);
        if(r != null) {
            return  decodeURIComponent(r[2]);
        } else {
            return null;
        }
    }
}
export let trim = (str) => {
    return str.replace(/\s|\xA0/g,"");
}
// 每次调用ajax 都会触发并调用这个函数
$.ajaxPrefilter(function (options) {
  console.log('http://ajax.frontend.itheima.net' + options.url);
})
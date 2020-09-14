$(function () {
  // 实现注册页面点击注册账号和登录的点击效果
  // 点击注册账号之后
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 点击登录之后
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  // 从layui中获取form对象
  var form = layui.form

  var layer = layui.layer
  form.verify({
    // 自定义了一个叫做pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须为6-12位且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd != value) {
        return '两次密码不一致'
      }
    }
  })

  // 检测注册的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post(
      '/api/reguser', data,
      function (res) {
        // 如果不为0 证明出错了 就输出返回的错误指示
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录')
        // 触发鼠标点击事件
        $('#link_login').click()
      })
  })

  // 检测表单的注册登陆事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    // 提交登录信息给服务器 查看是否可以登录
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 提交表单的内容也就是用户输入的用户名和密码
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败！')
        }
        layer.msg('登陆成功！')
        // 存储这个token密钥到本地存档 
        localStorage.setItem('token', res.token)
        // 跳转到这个页面
        location.href = '/index.html'
      }
    })
  })

})
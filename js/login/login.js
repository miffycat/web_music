$(()=>{
  if(location.pathname.endsWith('login.html')){
    let $main = $('.main');
    $main.css({ 'height': 752, 'background': '#949494' });
    $('.login_outer').mousemove(function (e) {
      let x = (e.pageX - this.offsetLeft) / (this.offsetWidth / 2) - 1,
        y = 1 - (e.pageY - this.offsetTop) / (this.offsetHeight / 2);

      $(this).css({ 'transform': `rotateX(${5 * y}deg) rotateY(${5 * x}deg)` })

    });
    $('.login_outer').mouseleave(function () {
      $(this).css({ 'transform': `rotateX(0deg) rotateY(0deg)` })
    });
  }
  
  //登录
  let $login_btn = $('.login_outer [data-action=login]'),
    $uname_inp = $('.login_outer [name=uname]'),
    $upwd_inp = $('.login_outer [name=upwd]');
  //登录按钮
  $login_btn.click(function (e) {
    e.preventDefault();

    function vali_uname(txt) {
      let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){2,7}$/;
      return reg.test(txt);
    }
    function vali_upwd(txt) {
      let reg = /^\w{6,11}$/;
      return reg.test(txt);
    }
    function show_tip() {
      $tips.html(tips);
      $icon.removeClass($icon[0].classList[1]).addClass(icon_class);
      $msg.show();
    }
    

    let uname = $('input[name=uname]').val().trim(),
      upwd = $('input[name=upwd]').val().trim(),
      $msg = $('.login_outer .showMsg'),
      $icon = $msg.find('.icon_msg'),
      $tips = $msg.find('.msg>span'),
      icon_class = 'warning',
      tips = '';


    if (uname == "") {
      tips = '用户名不能为空';
      icon_class = 'warning';
    } else if (!vali_uname(uname)) {
      tips = '用户名必须为3-8位的字母、数字、下划线';
      icon_class = 'warning'
    } else if (upwd == '') {
      tips = '密码不能为空';
      icon_class = 'warning';
    } else if (!vali_upwd(upwd)) {
      tips = '密码必须为6-11位的字母、数字、下划线';
      icon_class = 'warning';
    } else {
      tips = '验证通过';
      icon_class = 'correct';
      $.ajax({
        type: 'post',
        url: 'data/login/login.php',
        data: { uname: uname, upwd: upwd },
      }).then((res) => {
        if (res.code > 0) {
          location='index.html';
        } else {
          tips = res.msg;
          icon_class = 'warning';
        }
        //异步请求, 与外部不冲突
        show_tip();
      })
    }
    show_tip();
  })
  $uname_inp.keydown(function (e) {
    if (e.keyCode == 13) {
      $upwd_inp.focus();
    }
  })
  $upwd_inp.keydown(function (e) {
    if (e.keyCode == 13) {
      $login_btn.trigger('click');
    }
  })
 
 
});
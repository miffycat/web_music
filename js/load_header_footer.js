$(()=>{
  $.get('header.html').then((data) => {
    // console.log($('#header_bg')[0]);
    $('#header_bg').html(data);
    //判断是否登录, 如果登录就更改头部登录信息
    function isLogin() {
      $.get('data/login/is_login.php').then((res) => {
        // console.log(res);
        if (res.code > 0) {
          $('.login.islogin').show();
          $('.login.nologin').hide();
        } else {
          $('.login.islogin').hide();
          $('.login.nologin').show();
        }
      })
    }
    isLogin();
    //登出按钮
    $('.islogin [data-action=logout]').click(function(e){
      e.preventDefault();
      $.get('data/login/logout.php').then(()=>{
        isLogin();
      })
    })
    //登录按钮
    //点击登录弹出登录框
    $('.login [data-action=login]').click(function(e){
      e.preventDefault();
      $.get('login_modal.html').then((data)=>{
        let $modal = $('.login_modal');
        //显示模态框
        $modal.html(data).show();
        $('body').css({ overflow: 'hidden' });
        //加载完毕, 保存变量
        let $login_btn = $('.login_outer [data-action=login]'),
            $uname_inp = $('.login_outer [name=uname]'),
            $upwd_inp = $('.login_outer [name=upwd]');
        $uname_inp.focus();
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
          function close_modal(){
            $('.login_modal').hide();
            $('body').css({ overflow: 'unset' });
          }
          
          let uname = $('input[name=uname]').val().trim(),
              upwd = $('input[name=upwd]').val().trim(),
              $msg = $('.login_outer .showMsg'),
              $icon = $msg.find('.icon_msg'),
              $tips = $msg.find('.msg>span'),
              icon_class = 'warning',
              tips = '';
         
          // console.log($('input[name=uname]')[0]);
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
                isLogin();
                close_modal();
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
        $uname_inp.keydown(function(e){
          if(e.keyCode==13&&$modal.is(':visible')){
            $upwd_inp.focus();
          }
        })
        $upwd_inp.keydown(function(e){
          if (e.keyCode == 13 && $modal.is(':visible')) {
            $login_btn.trigger('click');
          }
        })
        //关闭登录框
        $('.login_outer [data-action=close]').click(function(e){
          $('.login_modal').hide();
          $('body').css({ overflow: 'unset' });
        })
      })
    })
  });
  $.get('nav.html').then((data) => {
    $('#nav_bg').html(data);
  });
  /* 由于footer.html代码片段中含有js语句(130行), 因此先包装为模板字符串, 然后在ajax请求完后用eval()运行该HTML片段
    传给ajax的是一段字符串, 所以可能存在编码和性能的问题 */
  $.get('footer.html').then((data) => {   
    $('#footer_bg')[0].innerHTML=eval(data);
  });
}
);
  

 

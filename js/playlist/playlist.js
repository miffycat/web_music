$(()=>{
  //楼层特效
  function set_animation($elms, length){
    let count=0;
    let timer=setInterval(()=>{
      // console.log(count);
      $($elms[count]).addClass('ani_load');
      count++;
      if(count==length){
        clearInterval(timer);
        timer=null;
      }
    },100)
  }
  //导航块宽度特效
  function change_width(elm){
    let $cube=elm.parent().parent().find('.slide_cube'),
        cube_width=elm[0].offsetWidth+16;
    $cube.css({ 'width': cube_width});
  }  
  //当条件被删除到小于1时就添加一个'全部'条件
  function add_total(){
    let condition=$('.condition>.tags');
    
    if(condition.children().length<1){
      condition.append('<a href="#" data-filter="total"><span>全部</span></a>');
    }
  }
  //当选择框为默认时, 删除条件框中响应的元素
  function del_condition($elm){
    let $parent=$('.condition>.tags'),
        filter=$elm.parent().parent().attr('data-filter')||arguments[1];
    $parent.find(`[data-filter=${filter}]`).remove(`[data-filter=${filter}]`);
    //当条件被删除到小于1时就添加一个'全部'条件
    add_total();
  }
  //添加条件
  //重载
  //1.当是filter中的元素时, 传入两个参数($elm, filter)
  //2.当是其他元素是, 传入一个参数($elm)
  function add_condition($elm){
    let $parent=$('.condition>.tags'),
        filter=$elm.parent().parent().attr('data-filter')||arguments[1],
        $sub=$(`<a href=#><i class="close">&times;</i></a>`),
        txt="";
        if($elm.children().length>0){
          txt=$elm.children('span').html();
        }else{
          txt=$elm.html();
        }
    //如果找到了相同的类别就替换文字
    //如果没有找到相同的类别就添加一个元素
    if($parent.children(`[data-filter=${filter}]`).length>0){
      $sub=$parent.children(`[data-filter=${filter}]`);
      $sub.children('span').html(txt);
    }else{
      $sub.prepend(`<span>${txt}</span>`).attr({'data-filter':filter}).appendTo($parent);
    }
    let condition=$('.condition>.tags');
    //当条件添加到大于2('全部'和其他)时就删除第一个条件--'全部'
    if(condition.children().length>1){
      condition.children('[data-filter=total]').remove();
    }  
  }

  //导航块滑动特效
  $("[data-filter]").on('click','a', function(e){
    e.preventDefault();
    let cube_width=this.offsetWidth+16;
    let left = this.offsetLeft + this.offsetParent.offsetLeft-8;
    
    $(this).addClass('active').siblings().removeClass('active')
    .parent().parent().children('.slide_cube').css({
      "left":left,
      'width':cube_width
    });
  });

  //筛选特效
  $(".tag_list.filter>.tags").on("click", 'a', function(e){
    e.preventDefault();
    
    let $tar=$(this),
        filter=$tar.attr("data-filter"),
        cur = $(`.popup_tag.${filter}`),
        siblings = $(`.popup_tag:not(.${filter})`);
    // console.log($tar[0]);
    //上下箭头切换
    $tar.children('i').toggleClass('arrow_down').toggleClass('arrow_up');
    cur.toggle();
    if (siblings.is(":visible")){
      siblings.hide();
    }
  })

  //筛选文字替换
  $('.popup_tag').on('click', 'a', function(e){
    e.preventDefault();
    let $tar=$(this),
        filter=$(this).parent().attr("data-sub"),
        $filter = $(`.filter>.tags>[data-filter=${filter}]`),
        txt=$tar.text(),
        ori_txt={'ages':'年代', 'music_comp':"唱片公司"};
        // console.log(filter,txt);
    $tar.addClass('active').siblings().removeClass('active');
    if(txt!="全部"){
      $filter.addClass('active').children('span').text(txt);
    }else{
      $filter.removeClass('active').children('span').text(ori_txt[filter]);
    }
    
    //选择后隐藏弹出菜单
    $tar.parent().hide();
  })

  //添加条件
  $('[data-filter]').on('click', 'a', function(e){
    e.preventDefault();
    if($(this).is('.active')){
      if($(this).html()=="全部"){
        del_condition($(this));
      }else{
        add_condition($(this));
      } 
    }
  });

  $('.popup_tag').on('click', 'a', function(e){
    e.preventDefault();
    let filter=$(this).parent().attr('data-sub'),
        $tag=$(`.filter>.tags>[data-filter=${filter}]`);
        // console.log($tag.is('.active'));
    if($tag.is('.active')){
      add_condition($tag, filter);
    }else{
      del_condition($tag, filter);
    }
  })

  //删除条件
  $('.condition>.tags').on('click','i', function(e){
    let filter=$(this).parent().attr('data-filter');
    $(this).parent().remove();
    //当删除条件框中的元素时, 将选择框中的滑块位置置为默认
    $(`.tag_list[data-filter=${filter}]>.tags>a:first-child`).trigger('click');
    $(`.popup_tag[data-sub=${filter}]>a:first-child`).trigger('click');
    add_total();
  })

  //ajax加载楼层
  function load_pl(index){
    let data={},
        $pagi_ul=$('.pagination>ul'),
        curpage=index||$pagi_ul.children('.active').children().html();
    $('.condition>.tags').children().each(function(){
      data[$(this).attr('data-filter')]=$(this).children('span').html();
    });
    data.curpage=curpage;
    // console.log(data);
    $.ajax({
      url:'data/playlist/load_plist.php',
      data:data,
    }).then((res)=>{
      let data=res.data,
          curpage=res.curpage*1,
          maxpage=res.maxpage*1,
          html="",
          $wrapper = $('.playlist_cont>.wrapper'),
          $pagi_ul=$('.pagination>ul');
      // console.log(data);
      for(let item of data){
        html+=`<li data-pid=${item.pid}>
          <div class="play_btn"></div>
          <img src="${item.pcover}">
          <div class="text_container">
            <p class="pl_intro" title=${item.ptitle}>${item.ptitle}</p>
            <p class="pl_amo">播放量
              <span>156.1</span>万</p>
          </div>
        </li>`;
      }
      $wrapper.html(html);
      //在列表项加载完之后开始动画
      //只能在此时获取lists, 否则可能找不到元素或被覆盖
      let $lists = $wrapper.children();
      set_animation($lists,30);
      //分页
      html=`<li class='${curpage==1?'disabled':''}'><a href="#" >上一页</a></li>`;
      html+=(curpage-2>0)?`<li><a href="#">${curpage-2}</a></li>`:'';
      html+=(curpage-1>0)?`<li><a href="#">${curpage-1}</a></li>`:'';
      html+=`<li  class='active'><a href="#">${curpage}</a></li>`;
      html+=(curpage+1<=maxpage)?`<li><a href="#">${curpage+1}</a></li>`:'';
      html+=(curpage+2<=maxpage)?`<li><a href="#">${curpage+2}</a></li>`:'';
      html+=`<li  class='${curpage==maxpage?'disabled':''}'><a href="#">下一页</a></li>`;
      $pagi_ul.html(html);
    });
  }
  $('[data-filter]').on('click', 'a', function(e){
    e.preventDefault();
    load_pl(1);
  })
  $('.popup_tag').on('click', 'a', function(e){
    e.preventDefault();
    load_pl(1);
  });
  //在页面加载的时候发送ajax请求全部数据
  load_pl();
  //分页
  $('.pagination>ul').on('click','li',function(e){
    e.preventDefault();
    let $tar=$(this),
        $parent=$('.pagination>ul'),
        tar_con=$tar.children('a').html();
    if($tar.is('.disabled')){
      return false;
    }
    if(tar_con=='上一页'){
      $parent.children('.active').removeClass('active').prev().addClass('active');
    }else if(tar_con=='下一页'){
      $parent.children('.active').removeClass('active').next().addClass('active')
    }else{
      $tar.addClass('active').siblings().removeClass('active');
    }
    load_pl();
  })
  
});
$(()=>{
    let cur_list=0, 
        direction=1;//向左为-1, 向右为1 
    const MAX_LIST=1; 
    function flip(cur_list){
        $('.mv .mv_item_cont').each(function(){
            console.log(`rotateY(${180 * (cur_list + 1)}deg)`);
            $(this).css({
                'transform': `rotateY(${180 * (cur_list + 1)}deg)`,
                'transitionDelay': `${Math.random() * 0.5}s`
            });
        });  
    }
    function light_idc(cur_list){
        $(`.mv_list .indecator li:eq(${cur_list})`).addClass('active')
            .siblings().removeClass('active');
    }
    $('.mv_bg .btn>.prev').click(()=>{
        flip(cur_list);
        cur_list--;
        cur_list=cur_list<0?1:cur_list;
        light_idc(cur_list);
    });
    $('.mv_bg .btn>.next').click(() => {
        flip(cur_list);
        cur_list++;
        cur_list = cur_list > 1 ? 0 : cur_list;
        light_idc(cur_list);
    });
});
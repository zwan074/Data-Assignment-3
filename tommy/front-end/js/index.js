

(function () {
    let display_flag=0;

    function control_display(){
        if(display_flag==1){
            $("#user-rem-box").delay(1000).fadeIn(800,"linear");
            $("#item-rem-box").fadeOut(500,"linear");
        }else if(display_flag==2){
            $("#user-rem-box").fadeOut(500,"linear");
            $("#item-rem-box").delay(1000).fadeIn(800,"linear");
        }
    }
    $("#user-rem-box").hide()
    $("#item-rem-box").hide()

    $(document).ready(function(){
        $("#user-rem-box").hide()
        $("#item-rem-box").hide()
        // icon_pos("#pc_icon",95,680,170)
        let work_flow_img_width = $("#work_flow_img").width()
        let work_flow_img_height = $("#work_flow_img").height()
        function icon_pos(element_name,pos_x,pos_y,el_width){
            $(element_name).css({
                "top":work_flow_img_height*(pos_y/2059),
                "left":work_flow_img_width*(pos_x/2421),
                "width":(work_flow_img_width/2421)*el_width,
            }).show()
            console.log(element_name)
        }
        let pageTimer = {} ;
        function icon_display(flg){
            // $(".icons").hide()
            for(var each in pageTimer){
                clearInterval(pageTimer[each]);
            }

            console.log('flag',flg)
            setTimeout(function () {
                icon_pos("#pc_icon",96,681,170)
            },1)
            pageTimer["timer1"]=setInterval(function () {$("#pc_icon").toggle("normal") },1000)


            setTimeout(function () {icon_pos("#server_icon",508,746,220)},1000)
            pageTimer["timer2"]=setInterval(function () {$("#server_icon").toggle("normal") },1000)

            setTimeout(function () {icon_pos("#ecn_icon",573,230,310)},2000)
            pageTimer["timer3"]=setInterval(function () {$("#ecn_icon").toggle("normal") },1000)

            setTimeout(function () {icon_pos("#rmq_icon",1226,1465,160)},3000)
            pageTimer["timer4"]=setInterval(function () {$("#rmq_icon").toggle("normal") },1000)

            if(flg==1){
                setTimeout(function () {icon_pos("#re_icon4",800,1773,60)},4000)
                pageTimer["timer5"]=setInterval(function () {$("#re_icon4").toggle("normal") },1000)
                setTimeout(function () {icon_pos("#re_icon5",926,1773,60)},5000)
                pageTimer["timer6"]=setInterval(function () {$("#re_icon5").toggle("normal") },1000)
                setTimeout(function () {icon_pos("#re_icon6",1052,1773,60)},6000)
                pageTimer["timer7"]=setInterval(function () {$("#re_icon6").toggle("normal") },1000)
            }

            if(flg==2){
                setTimeout(function () {icon_pos("#re_icon1",1280,1773,60)},4000)
                pageTimer["timer8"]=setInterval(function () {$("#re_icon1").toggle("normal") },1000)
                setTimeout(function () {icon_pos("#re_icon2",1412,1773,60)},5000)
                pageTimer["timer9"]=setInterval(function () {$("#re_icon2").toggle("normal") },2000)
                setTimeout(function () {icon_pos("#re_icon3",1537,1773,60)},6000)
                pageTimer["timer10"]=setInterval(function () {$("#re_icon3").toggle("normal") },3000)
            }
            setTimeout(function () {icon_pos("#sql_icon",1547,1430,575)},7000)
            pageTimer["timer11"]=setInterval(function () {$("#sql_icon").toggle("normal") },1000)


        }


        // user button
        $("#user-demo button").click(function(){
            $(".icons").hide()
            // $(".icons").css('width',0)

            icon_display(1);
            let url_user ="http://127.0.0.1:5000/topN/"+ $("#username").val();
            console.log('topN')
            $.ajax({
                url:url_user,
                type:"GET",
                success: function (data) {
                    console.log(data)
                    $("#user-rem-box .user_id").text(data.username)
                    $("#user-rem-box .item-block ").each(function (i,element) {
                        $(this).find("img").attr("src",data.items_info[i][1] )
                        $(this).find("h5").text(data.items_info[i][0] )
                        $(this).find("p").text(data.items[i] )

                    })
                    display_flag = 1;
                    control_display();
                }
            });

        });
        // item button
        $("#item-demo button").click(function(){
            // $(".icons").removeAttr('style').hide()
            $(".icons").hide()

            icon_display(2);

            let url_item ="http://127.0.0.1:5000/knn/"+ $("#item_name").val();

            console.log('knn')
            $.ajax({
                url:url_item,
                type:"GET",
                success: function (data) {
                    console.log(data)
                    $("#item-rem-box .user_id").text(data.username)
                    $("#item-rem-box .item-block ").each(function (i,element) {
                        $(this).find("img").attr("src",data.items_info[i][1] )
                        $(this).find("h5").text(data.items_info[i][0] )
                        $(this).find("p").text(data.items[i] )
                    })
                    display_flag = 2;
                    control_display();
                }
            });

        });



    });



})();

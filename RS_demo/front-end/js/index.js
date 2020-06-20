

(function () {
    let display_flag=0;
    let flicker=100;
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
            // console.log(element_name)
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
                $("#pc_icon").delay(flicker).toggle("fast")
                $("#pc_icon").toggle("fast")
                $("#pc_icon").delay(flicker).toggle("fast")
                $("#pc_icon").toggle("fast")
                $("#pc_icon").delay(flicker).toggle("fast")
            },1)

            setTimeout(function () {
                icon_pos("#server_icon",508,746,220)
                $("#server_icon").delay(flicker).toggle("fast")
                $("#server_icon").toggle("fast")
                $("#server_icon").delay(flicker).toggle("fast")
                $("#server_icon").toggle("fast")
                $("#server_icon").delay(flicker).toggle("fast")
            },2000)

            setTimeout(function () {icon_pos("#ecn_icon",573,230,310)
                $("#ecn_icon").delay(flicker).toggle("fast")
                $("#ecn_icon").toggle("fast")
                $("#ecn_icon").delay(flicker).toggle("fast")
                $("#ecn_icon").toggle("fast")
                $("#ecn_icon").delay(flicker).toggle("fast")},4000)

            setTimeout(function () {icon_pos("#rmq_icon",1226,1465,160)
                $("#rmq_icon").delay(flicker).toggle("fast")
                $("#rmq_icon").toggle("fast")
                $("#rmq_icon").delay(flicker).toggle("fast")
                $("#rmq_icon").toggle("fast")
                $("#rmq_icon").delay(flicker).toggle("fast")},6000)

            if(flg==2){
                let icon_id =Math.floor( Math.random()*3+1);
                console.log("icon_id",icon_id)
                // let icon_name ="#re_icon"+icon_id
                // console.log("icon_name",icon_name)
                if(icon_id==1){
                    setTimeout(function () {icon_pos("#re_icon4",800,1773,60)
                        $("#re_icon4").delay(flicker).toggle("fast")
                        $("#re_icon4").toggle("fast")
                        $("#re_icon4").delay(flicker).toggle("fast")
                        $("#re_icon4").toggle("fast")
                        $("#re_icon4").delay(flicker).toggle("fast")},8000)
                }else if(icon_id==2){
                    setTimeout(function () {icon_pos("#re_icon5",926,1773,60)
                        $("#re_icon5").delay(flicker).toggle("fast")
                        $("#re_icon5").toggle("fast")
                        $("#re_icon5").delay(flicker).toggle("fast")
                        $("#re_icon5").toggle("fast")
                        $("#re_icon5").delay(flicker).toggle("fast")},8000)
                }else if(icon_id==3){
                    setTimeout(function () {icon_pos("#re_icon6",1052,1773,60)
                        $("#re_icon6").delay(flicker).toggle("fast")
                        $("#re_icon6").toggle("fast")
                        $("#re_icon6").delay(flicker).toggle("fast")
                        $("#re_icon6").toggle("fast")
                        $("#re_icon6").delay(flicker).toggle("fast")},8000)
                }
            }

            if(flg==1){
                let icon_id =Math.floor( Math.random()*3+1);
                console.log("icon_id",icon_id)
                // let icon_name ="#re_icon"+icon_id
                if(icon_id==1){
                    setTimeout(function () {icon_pos("#re_icon1",1280,1773,60)
                        $("#re_icon1").delay(flicker).toggle("fast")
                        $("#re_icon1").toggle("fast")
                        $("#re_icon1").delay(flicker).toggle("fast")
                        $("#re_icon1").toggle("fast")
                        $("#re_icon1").delay(flicker).toggle("fast")},8000)
                }else if(icon_id==2){
                    setTimeout(function () {icon_pos("#re_icon2",1412,1773,60)
                        $("#re_icon2").delay(flicker).toggle("fast")
                        $("#re_icon2").toggle("fast")
                        $("#re_icon2").delay(flicker).toggle("fast")
                        $("#re_icon2").toggle("fast")
                        $("#re_icon2").delay(flicker).toggle("fast")},8000)
                }else if(icon_id==3){
                    setTimeout(function () {icon_pos("#re_icon3",1537,1773,60)
                        $("#re_icon3").delay(flicker).toggle("fast")
                        $("#re_icon3").toggle("fast")
                        $("#re_icon3").delay(flicker).toggle("fast")
                        $("#re_icon3").toggle("fast")
                        $("#re_icon3").delay(flicker).toggle("fast")},8000)
                }

            }

            setTimeout(function () {icon_pos("#sql_icon",1547,1430,575)
                $("#sql_icon").delay(200).toggle("fast")
                $("#sql_icon").toggle("fast")
                $("#sql_icon").delay(200).toggle("fast")
                $("#sql_icon").toggle("fast")
                $("#sql_icon").delay(200).toggle("fast")},10000)
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

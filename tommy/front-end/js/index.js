

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
                "top":work_flow_img_height*(pos_y/1776),
                "left":work_flow_img_width*(pos_x/2421),
                "width":(work_flow_img_width/2421)*el_width,
            }).show()
            console.log(element_name)
        }
        function icon_display(){
            setTimeout(function () {
                icon_pos("#pc_icon",95,680,170)
            },1)
            setInterval(function () {$("#pc_icon").toggle("normal") },1000)


            setTimeout(function () {icon_pos("#server_icon",508,745,220)},1000)
            setInterval(function () {$("#server_icon").toggle("normal") },1000)

            setTimeout(function () {icon_pos("#feign_icon",975,720,675)},2000)
            setInterval(function () {$("#feign_icon").toggle("normal") },1000)

            //todo rs icon

            setTimeout(function () {icon_pos("#sql_icon",1547,1430,575)},5000)
            setInterval(function () {$("#sql_icon").toggle("normal") },1000)


        }


        // user button
        $("#user-demo button").click(function(){
            icon_display();
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
            // icon_display();

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

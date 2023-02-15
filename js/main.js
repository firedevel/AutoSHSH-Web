var server="http://127.0.0.1:8000/"

$("#add-btn").click(()=>{ 
   $("#add-btn").addClass("btn-loading");
   $("#add-btn").attr("disabled",true);
   $.ajax({
    type: "POST",
    url: server+"new_device",
    data: JSON.stringify({
        "model": $("#add-model").val(),
        "board": $("#add-board").val(),
        "ecid": $("#add-ecid").val(),
        "token": ""
      }),
    dataType: "json",
    contentType: "application/json",
    success: function (response) {
        if(response.status=="success"){
            alert("已添加到队列, id: "+response.uuid+"\n以后若要从服务器中删除数据需要此id")
        }else{
            alert("添加失败，原因："+response.reason)
        }
        $("#add-btn").attr("disabled",false);
        $("#add-btn").removeClass("btn-loading");
    }
   });
   
    
});


$("#add-btn").click(()=>{ 
   $("#add-btn").addClass("btn-loading");
   $("#add-btn").attr("disabled",true);
   $.ajax({
    type: "GET",
    url: server+"device_info",
    data: {
        "model": $("#find-model").val(),
        "board": $("#find-board").val(),
        "ecid": $("#find-ecid").val()
      },
    success: function (response) {
        if(response.status=="success"){
            renderView(response)
        }else{
            alert("添加失败，原因："+response.reason)
        }
        $("#add-btn").attr("disabled",false);
        $("#add-btn").removeClass("btn-loading");
    }
   });
});

function renderView(res){
    $("#c-main").animate({opacity:'0'},()=>{
        $("#c-main").addClass('hide')
        $("#c-view").css('opacity','0')
        $("#ecid").text(res.ecid);
        $("#board").text(res.board);
        $("#model").text(res.model);
        $("#c-view").removeClass('hide')
        fjson = JSON.parse(res.file_json)
        for (const i in fjson) {
            console.log()
            $("#view-tbody").append('<tr><td>'+i+'</td><td>'+fjson[i]['time']+'</td><td><a href="'+server+"down_shsh/"+res.id+'_'+i+'"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" class="eva eva-cloud-download-outline" fill="inherit"><rect width="24" height="24" opacity="0"></rect><path d="M14.31 16.38L13 17.64V12a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 21a1 1 0 0 0 .69-.28l3-2.9a1 1 0 1 0-1.38-1.44z"></path><path d="M17.67 7A6 6 0 0 0 6.33 7a5 5 0 0 0-3.08 8.27A1 1 0 1 0 4.75 14 3 3 0 0 1 7 9h.1a1 1 0 0 0 1-.8 4 4 0 0 1 7.84 0 1 1 0 0 0 1 .8H17a3 3 0 0 1 2.25 5 1 1 0 0 0 .09 1.42 1 1 0 0 0 .66.25 1 1 0 0 0 .75-.34A5 5 0 0 0 17.67 7z"></path></svg></a></td></tr>');
        }
        $("#c-view").animate({opacity:'1'});
    });

}
console.log('Welcome to Alpha Studio....');
var pObj = $(".glyphicon-file").parent().parent();
var s = '<a href="javascript:void(0)" id="manualInputId" type="button" class="btn btn-success"><span class="glyphicon glyphicon-file"></span>办理居住证(手工录入)</a>';
pObj.append(s);

var html = '<div class="container" id="myForm" style="display:none;"><div class="row" style="padding:5px"><div class="col-md-4">姓&nbsp;&nbsp;&nbsp;&nbsp;名：<input id="txtName" name="txtName" type="text" placeholder="申办人姓名" class="input-large" ></div><div class="col-md-4">出生年月：<input id="txtBorn" name="txtBorn" type="text" placeholder="格式为：2014年1月10日" class="input-large" ></div><div class="col-md-2">性别：<input type="radio" name="rdoGender" value="男" checked="checked">男&nbsp;<input type="radio" name="rdoGender" value="女" >女</div><div class="col-md-2"><button id="btnSave" class="btn btn-primary">录入</button></div></div><div class="row" style="padding:5px"><div class="col-md-4">证件号：<input id="txtIdCard" name="txtIdCard" type="text" placeholder="身份证号码" class="input-large"></div><div class="col-md-4">户籍地址：<input id="txtAddress" name="txtAddress" type="text" placeholder="户籍地址必须详细且准确" class="input-large" ></div><div class="col-md-3">民族：<input id="txtNation" name="txtNation" type="text" placeholder="汉" class="input-mini" style="width:40px;" value="汉">族</div></div></div>';
$(".breadcrumb").parent().append(html);

var myJs = '<script type="text/javascript">var IDCard=function(){this.ReadCard=function(){return 0};this.Address="";this.Born="";this.Name="";this.CardNo="";this.Sex="";this.Nation=""};var CVR_IDCard=new IDCard();function bljzz2(){var html=new Array();var jsonStr="";var submits=function(v,h,f){if(v==0){if($("#sbName",h).val()==""){var strReadResult=CVR_IDCard.ReadCard();if(strReadResult=="0"){if(CVR_IDCard.Address.length>0&&CVR_IDCard.Address.indexOf("广东")>=0&&CVR_IDCard.Address.indexOf("深圳")>=0){$.jBox.info("深圳市户籍居民不允许办理居住证！")}var bornDate="";if(CVR_IDCard.Born.indexOf("日")>0){bornDate=CVR_IDCard.Born.replace(/[年|月]/g,"-").replace("日","")}else{if(/^\d{8}$/.test(CVR_IDCard.Born)){bornDate=CVR_IDCard.Born.substring(0,4)+"-"+CVR_IDCard.Born.substring(4,6)+"-"+CVR_IDCard.Born.substring(6,8)}}var str=[$.trim(CVR_IDCard.Name),$.trim(CVR_IDCard.CardNo),CVR_IDCard.Sex=="男"?"1":"2",bornDate,CVR_IDCard.Address,CVR_IDCard.Nation+"族"].join("|");jsonStr="&jsonStr="+encodeURIComponent(str);$("#sbName",h).val($.trim(CVR_IDCard.Name));$("#idCard",h).val($.trim(CVR_IDCard.CardNo))}else{if(strReadResult.indexOf("已读过")>=0){strReadResult+="重新拿放一下身份证。"}$.jBox.info(strReadResult)}}else{if($("#sbName",h).val()!=""&&$("#idCard",h).val()!=""){$.jBox.info("姓名和身份证已经读取！")}}return false}else{if(1==v||2==v){console.log(f);var name=encodeURI(encodeURI(f.name));var applyCondition=encodeURI(encodeURI(f.applyCondition));var applyCategory=encodeURI(encodeURI(f.applyCategory));var blReason=f.blReason;var hlReason=f.hlReason;if((f.idCard=="")||(f.name=="")||f.applyCondition==""||f.applyCategory==""||f.applyCategory<1){$.jBox.tip("请填写完整搜索条件！");return false}else{var nameLength=f.name.length;if(nameLength<2||nameLength>15){$.jBox.tip("姓名至少2个汉字，至多15个汉字");return false}var nameRegex=new RegExp("^[\\u4E00-\\u9FA5\\uF900-\\uFA2D·]{2,15}$");if(!nameRegex.test(f.name)){$.jBox.tip("姓名中只能是汉字");return false}var msg=isCardID(f.idCard);if(msg!=true){$.jBox.tip(msg);return false}ShowDiv();$.ajax({url:"/admin/jzzgl/grbz/yysl/bljzzQueryPost?idCard="+f.idCard+"&name="+name+"&applyCondition="+applyCondition+"&applyCategory="+applyCategory,dataType:"text",type:"get",success:function(data){HiddenDiv();if(data!=""){$("#sbName",h).val("");$("#idCard",h).val("");var resultObj=eval(data);top.$.jBox.info(resultObj[0].message);return false}else{var saveUrl="/index/manage/residence/saveJzzSimpleInfo?idCard="+f.idCard+"&name="+name+"&applyCondition="+applyCondition+"&applyCategory="+applyCategory+jsonStr;if(typeof(blReason)!="undefined"){saveUrl+="&blReason="+blReason}if(typeof(hlReason)!="undefined"){saveUrl+="&hlReason="+hlReason}ShowDiv();$.ajax({url:saveUrl,dataType:"json",type:"get",sync:false,success:function(data){HiddenDiv();if(data&&typeof(data.status)!="undefined"){if(data.status==1){top.$.jBox.info("简项登记成功！");$("#sbName",h).val("");$("#idCard",h).val("")}else{if(data.status==0){top.$.jBox.info("简项登记失败！"+data.msg)}}if(2==v){return true}else{if(1==v){return false}}}},error:function(data){HiddenDiv();top.$.jBox.info("简项登记失败！"+data.msg);if(2==v){return true}else{if(1==v){return false}}}})}},error:function(msg){HiddenDiv();top.$.jBox.tip("查询数据失败！"+msg)}});return false}}else{top.$.jBox.tip("取消成功！");page();return true}}};var strReadResult=CVR_IDCard.ReadCard();if(strReadResult=="0"){if(CVR_IDCard.Address.length>0&&CVR_IDCard.Address.indexOf("广东")>=0&&CVR_IDCard.Address.indexOf("深圳")>=0){$.jBox.info("深圳市户籍居民不允许办理居住证！");return}var bornDate="";if(CVR_IDCard.Born.indexOf("日")>0){bornDate=CVR_IDCard.Born.replace(/[年|月]/g,"-").replace("日","")}else{if(/^\d{8}$/.test(CVR_IDCard.Born)){bornDate=CVR_IDCard.Born.substring(0,4)+"-"+CVR_IDCard.Born.substring(4,6)+"-"+CVR_IDCard.Born.substring(6,8)}}var str=[$.trim(CVR_IDCard.Name),$.trim(CVR_IDCard.CardNo),CVR_IDCard.Sex=="男"?"1":"2",bornDate,CVR_IDCard.Address,CVR_IDCard.Nation+"族"].join("|");jsonStr="&jsonStr="+encodeURIComponent(str);$.jBox($("#hidediv").html().replace("#name#",CVR_IDCard.Name).replace("#idCard#",CVR_IDCard.CardNo),{title:"请填写搜索条件",width:500,height:300,persistent:false,buttons:{"读卡":0,"提交":1,"完成":2,"取消":3},icon:"question",close:"关闭",showClose:true,opacity:0.8,submit:submits,closed:function(){page()}});return}else{if(strReadResult.indexOf("已读过")>=0){strReadResult+="重新拿放一下身份证。"}$.jBox.info(strReadResult)}};function isCardID(id){if(id){console.log("IdCard="+id);return true;}}function ShowDiv() {$("#loading").show();}function HiddenDiv() {$("#loading").hide();} function page(){}</script>';
$(document.body).append(myJs);
$("#manualInputId").toggle(function(){
  $('#myForm').show();
}, function(){
  $('#myForm').hide();
});

$("#btnSave").click(function(){
  if(!CVR_IDCard){
    CVR_IDCard = new IDCard();
  }
  CVR_IDCard.Address= $("#txtAddress").val()||"";
  CVR_IDCard.Born=$("#txtBorn").val()||"";
  CVR_IDCard.Name=$("#txtName").val()||"";
  CVR_IDCard.CardNo=$("#txtIdCard").val()||"";
  CVR_IDCard.Sex=$("input[name='rdoGender']:checked").val()||"";
  CVR_IDCard.Nation=$("#txtNation").val()||"";
  console.log(CVR_IDCard);
  $('#myForm').hide();

 var timer = setInterval(function() {
   console.log("timer is running.");
   if ($("#jbox-iframe") && $("#jbox-iframe")[0]) {
     if (timer) {
       clearInterval(timer);
       console.log("timer is stop.");
     }
     var iframe = $("#jbox-iframe")[0];
     var innerWin = iframe.contentWindow;
     innerWin.document.getElementById("houseCodeDd").style.display = "block";
     innerWin.document.getElementById("xjdAdress").style.display = "block";
   }
 }, 2000);

 bljzz2();
});
console.log('The system has been taken over. Good luck!');
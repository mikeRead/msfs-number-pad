let code = (number, add1)=>{
    if(number){
        if(number == 'input'){
            number = $("#code").text()
        }
        if(add1 && number.indexOf("1") !== 0){
            number = '1'+number
        }
        $("#code").text(number)
    }
   return $("#code").text()
}

let clearCode = ()=>{
    $("#code").text('')
}

let backCode = ()=>{
    if(code().length <= 1){
        return clearCode()
    }
    code(code().slice(0, -1))
}

let press = (number)=>{
    code(code()+number)
}





let com1 = ()=>{
    let val = code()
    if(val == ''){
        code("121.9")
        return;
    }
    send("COM_RADIO_SET",code('input',true))
}

let com2 = ()=>{
    let val = code()
    if(val == ''){
        code("122.8")
        return;
    }
    send("COM_STBY_RADIO_SET",code('input',true))
}

let nav1 = ()=>{
    let val = code()
    if(val == ''){
        code("121.")
        return;
    }
    send("NAV1_RADIO_SET",code('input',true))
}

let nav2 = ()=>{
    let val = code()
    if(val == ''){
        code("122.")
        return;
    }
    send("NAV1_STBY_SET",code('input',true))
}




let comSwitch = ()=>{
    send("COM_STBY_RADIO_SWAP")
}

let navSwitch  = ()=>{
    send("NAV1_RADIO_SWAP")
}

let navObs = ()=>{
    let val = code()
    if(val == ''){
        code("0")
        return;
    }
    send("VOR1_SET",code())
}

let heading = ()=>{
    let val = code()
    if(val == ''){
        code("0")
        return;
    }
    send("HEADING_BUG_SET",code())
}
let squawk = ()=>{
    let val = code()
    if(val == ''){
        code("1200")
        return;
    }

    //quick fix for xpndr
    send("XPNDR_SET",`${val[0]}${val[1]}.${val[2]}${val[3]}`)
}

let altimiter = ()=>{
    let val = parseFloat(code())
    
    if(isNaN(val)){
        code("29.92")
        return;
    }
    if(val>31){
        val = val/100
    }

    send("KOHLSMAN_SET",parseInt(val*33.864*16))
}

let send = (key,val)=>{

    var form_data 
    if(val){
        form_data = new FormData();
        form_data.append("value_to_use", val);   
    }

    $.ajax({
        url         : `/event/${key}/trigger`,
        data        : form_data,
        processData : false,
        contentType : false,
        type: 'POST'
    }).done(function(data){
        $(".col-4").css("background-color",'green') ;
        setTimeout(()=>{
           $(".col-4").css("background-color",'')
        },500)
        clearCode()
    }).fail(()=>{
         $(".col-4").css("background-color",'red') ;
         setTimeout(()=>{
            $(".col-4").css("background-color",'')
         },500)
    })
    
    console.log("sending:", key,val)
}
console.log("laksjdflkj")








let toggleRadios = ()=>{
     $("#dragDiv").toggle()
}

$(document).mousedown(function(e){
    if(e.which == 2) toggleRadios()
})




//Make the DIV element draggagle:
dragElement(document.getElementById("dragDiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
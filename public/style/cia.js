//variaveis globais
var banheiro = quarto = cozinha = sala1 = sala2 = connection_lamp_all = statusCurtain = 0;
var valorCheck = "";

function statusLampOff(idLampOffbtn,idLampOffimg){
    document.getElementById(idLampOffimg).src = "img/leddesligada.png";
    document.getElementById(idLampOffbtn).style.background = "#337AB7";
    document.getElementById(idLampOffbtn).style.border = "2px solid #337AB7";
    document.getElementById(idLampOffbtn).style.color = "#fff";
}
function statusLampOn(idLampOnbtn,idLampOnimg){
    document.getElementById(idLampOnimg).src = "img/ledligada.png";
    document.getElementById(idLampOnbtn).style.background = "#fff";
    document.getElementById(idLampOnbtn).style.border = "2px solid #337AB7";
    document.getElementById(idLampOnbtn).style.color = "#337AB7";
}

function statusLampOff_all(idbtn,idimg){
    document.getElementById(idimg).src = "img/leddesligada.png";
    document.getElementById(idbtn).style.background = "#337AB7";
    document.getElementById(idbtn).style.border = "2px solid #337AB7";
    document.getElementById(idbtn).style.color = "#fff";
}
function statusLampOn_all(idbtn,idimg){
    document.getElementById(idimg).src = "img/ledligada.png";
    document.getElementById(idbtn).style.background = "#fff";
    document.getElementById(idbtn).style.border = "2px solid #337AB7";
    document.getElementById(idbtn).style.color = "#337AB7";
}

//FUNÇAO LAMPADA BANHEIRO
function acenderLampBanheiro(){
    if(banheiro == 0){
        banheiro = 1;
        connection_lamp_all += 1;
        statusLampOn("lmpBanheiro","lampBanheiro");
        status();
    }else{
        banheiro = 0;
        statusLampOff("lmpBanheiro","lampBanheiro");
        connection_lamp_all -= 1;
        status();
    }
}
// FUNÇAO DA LAMPADA DA COZINHA
function acenderLampCozinha(){
    if(cozinha == 0) {
        cozinha = 1;
        statusLampOn("lmpCozinha","lampCozinha");
        connection_lamp_all += 1;
        status();
    }else{
        cozinha = 0;
        statusLampOff("lmpCozinha","lampCozinha");
        connection_lamp_all -= 1;
        status();
    }
}

// FUNÇAO DA LAMPADA DO QUARTO
function acenderLampQuarto() {
    if (quarto == 0) {
        quarto = 1;
        statusLampOn("lmpQuarto","lampQuarto");
        connection_lamp_all += 1;
        status();
    } else {
        quarto = 0;
        statusLampOff("lmpQuarto","lampQuarto");
        connection_lamp_all -= 1;
        status();
    }
}
// FUNÇAO DA LAMPADA 1 DA SALA
function acenderLampSala1() {
    if (sala1 == 0) {
        sala1 = 1;
        statusLampOn("lmp1sala","lamp1Sala");
        connection_lamp_all += 1;
        status();
    } else {
        sala1 = 0;       
        statusLampOff("lmp1sala","lamp1Sala");
        connection_lamp_all -= 1;
        status();
    }
}
//FUNÇAO DA LAMPADA 2 DA SALA
function acenderLampSala2(){
    if(sala2 == 0){
       sala2 = 1;   
       statusLampOn("lmp2sala","lamp2Sala");
       connection_lamp_all += 1;
       status();
    }else{
       sala2 = 0;
       statusLampOff("lmp2sala","lamp2Sala");
       connection_lamp_all -= 1;
       status();
    }
}

function status(){
    if(connection_lamp_all == 5){
        document.getElementById("cmn-toggle-2").checked = "true";
    }else if(connection_lamp_all < 5){
        var checkStatus = document.getElementById("cmn-toggle-2").checked;
        if(checkStatus == true){
            document.getElementById("cmn-toggle-2").checked = false;
        }
    }else{
        return;
    }
}
//FUNÇAO DE TODAS AS LAMPADAS
function controlAllLamps(){
  valorCheck = document.getElementById("cmn-toggle-2").checked;
    
 if(valorCheck == true){
      statusLampOn_all("lmpBanheiro","lampBanheiro");
      statusLampOn_all("lmpCozinha","lampCozinha");
      statusLampOn_all("lmpQuarto","lampQuarto");
      statusLampOn_all("lmp2sala","lamp2Sala");
      statusLampOn_all("lmp1sala","lamp1Sala");
     
      banheiro = 1;
      cozinha = 1;
      quarto = 1;
      sala1 = 1;
      sala2 = 1;
      connection_lamp_all = 5;
  }else{
     statusLampOff_all("lmpBanheiro","lampBanheiro");
     statusLampOff_all("lmpCozinha","lampCozinha");
     statusLampOff_all("lmpQuarto","lampQuarto");
     statusLampOff_all("lmp2sala","lamp2Sala");
     statusLampOff_all("lmp1sala","lamp1Sala");
     
     banheiro = 0;
     cozinha = 0;
     quarto = 0;
     sala1 = 0;
     sala2 = 0;
     connection_lamp_all = 0;
  }
}
//FUNCAO CORTINA
function activeCurtain(){
   if(statusCurtain == 0){
     document.getElementById("curtain_img").src = "img/cortina_aberta.png";
     document.getElementById("curtain").style.background = "#fff";
     document.getElementById("curtain").style.border = "2px solid #337AB7";
     document.getElementById("curtain").style.color = "#337AB7";
     statusCurtain = 1;
   }else{
     document.getElementById("curtain_img").src = "img/cortina_fechada.png";
     document.getElementById("curtain").style.background = "#337AB7";
     document.getElementById("curtain").style.border = "2px solid #337AB7";
     document.getElementById("curtain").style.color = "#fff";
     statusCurtain = 0; 
   }
}
function acaoBtn(){
        btntv = document.getElementById('btn-acao');
        btntvimg = document.getElementById('tv_img');
    if (btntv.innerHTML.match("Ligar")) {
        btntv.innerHTML = "Desligar";
        btntv.style.background = "#d9534f";
        btntv.style.border = "1px solid #d9534f";
        btntvimg.src = "img/tvligada.png";
	}
	else{
		btntv.innerHTML = "Ligar";
		btntv.style.background = "#5cb85c";
		btntv.style.border = "1px solid #5cb85c";
		btntvimg.src = "img/tvdesligada.png";
	}
}

$(function(){
    $('.btn').on('click', function(){
            var btn = $(this).button('loading');
            setTimeout(function (){
                btn.button('reset')
            }, 1000);
        });
})

$(function(){
    $('#curtain').on('click', function(){
            var btn = $(this).button('loading');
            setTimeout(function (){
                btn.button('reset')
            }, 5000);
        });
})
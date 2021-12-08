const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".check1"),
continueBtn2 = form.querySelector(".check2"),
errorText = form.querySelector(".error-text");

var fichero1 = "";
var fichero2 = "";

jQuery('#archivo').change(function(){
  var filename = "";
  filename = jQuery(this).val().split('\\').pop();
  var idname = "archivo";
  console.log(jQuery(this));
  console.log(filename);
  console.log(idname);
  jQuery('span.'+idname).next().find('span').html(filename);
  document.getElementById("check1").style.display="initial";
 });
 


  jQuery('#archivo2').change(function(){
    var filename = jQuery(this).val().split('\\').pop();
    var idname = "archivo2";
    console.log(jQuery(this));
    console.log(filename);
    console.log(idname);
    jQuery('span.'+idname).next().find('span').html(filename);
    document.getElementById("check2").style.display="initial";
   });
   


form.onsubmit = (e)=>{
    e.preventDefault();
}



continueBtn.onclick = ()=>{
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "INCLUDES/funciones/files_upload.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
             $nombre_fichero = JSON.parse(xhr.responseText);
             fichero1 = "../../code/"+ $nombre_fichero;
             readTextFile("code/"+$nombre_fichero);    
          }
      }
    }
    let formData = new FormData(form);
    formData.append('flag', 'code');
    formData.append('fichero','archivo');
    xhr.send(formData);
}
continueBtn2.onclick = ()=>{
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/files_upload.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
           $nombre_fichero = JSON.parse(xhr.responseText);
           fichero2 = "../../code/"+ $nombre_fichero;
           readTextFile2("code/"+$nombre_fichero);
  
        }
    }
  }
  let formData = new FormData(form);
  formData.append('flag', 'code');
  formData.append('fichero','archivo2');
  xhr.send(formData);
}

function readTextFile(fichero) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", fichero, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("contenido").innerHTML = 
      `<button onclick="exitBtn()" class="recargar" id="recargar"><i class="fas fa-times-circle"></i></button>`+
      `<textarea name="textarea" id="area" rows="16" cols="92">`+
      allText + `</textarea>`;
    }
  }
  rawFile.send();
}

function readTextFile2(fichero) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", fichero, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("contenido2").innerHTML = 
      `<button onclick="exitBtn2()" class="recargar2" id="recargar2"><i class="fas fa-times-circle"></i></button>`+
      `<textarea name="textarea2" id="area2" rows="16" cols="92">`+
      allText + `</textarea>`;
    }
  }
  rawFile.send();
}


function exitBtn() {
  $("#contenido").load(location.href + " #contenido");


}

function exitBtn2() {
  $("#contenido2").load(location.href + " #contenido2");

}

function documento1(){
  var doc1 = document.getElementById("area").value;
  document.getElementById("resultados").innerHTML = doc1;
  return doc1;
}

function documento2(){
  var doc2 = document.getElementById("area2").value;
  return doc2;
}

function accion(){
  var texto = "";
  var similitud = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/jaccard.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
          similitud = parseInt(JSON.parse(xhr.responseText));
          if( similitud > 0 && similitud <=30 ){
            texto += `<div style="background-color: green; height: 3em; width: 100%"></div>`;
          }
          if( similitud > 30 && similitud <=60 ){
            texto += `<div style="background-color: orange; height: 3em; width: 100%"></div>`;
          }
          if( similitud > 60 && similitud <=100 ){
            texto += `<div style="background-color: red; height: 3em; width: 100%"></div>`;
          }
          texto += `<h1>Resultado de similitud</h1>
          <p style="font-size: 20vh;text-align: center">`+JSON.parse(xhr.responseText) + "%"+`</p>`;
                 
          document.getElementById("resultado_numerico").innerHTML = texto;
            
            
        }
    }
  }
  let formData = new FormData(form);
  formData.append('documento_1', fichero1);
  formData.append('documento_2',fichero2);
  xhr.send(formData);
}
const form = document.querySelector(".signup form"),
  continueBtn = form.querySelector(".code1"),
  continueBtn2 = form.querySelector(".code2"),
  errorText = form.querySelector(".error-text");

var fichero1 = "";
var fichero2 = "";
var variables = [];
var variables_coseno = [];
var variables_semantica = [];
var cont = 0;

$("#code2").prop("disabled", true); //Disable
$("#code1").prop("disabled", true); //Disable

jQuery('#archivo').change(function () {
  var filename = "";
  var selected_file_name = $(this).val();
  if (selected_file_name.length > 0) {
    filename = jQuery(this).val().split('\\').pop();
    var idname = "archivo";
    console.log(jQuery(this));
    console.log(filename);
    console.log(idname);
    jQuery('span.' + idname).next().find('span').html(filename);
    document.getElementById("check1").style.display = "initial";
    document.getElementById("code1").style.backgroundColor = "gray";
    $("#code1").prop("disabled", false);
  }
});



jQuery('#archivo2').change(function () {
  var filename = "";
  var selected_file_name = $(this).val();
  if (selected_file_name.length > 0) {
    var filename = jQuery(this).val().split('\\').pop();
    var idname = "archivo2";
    console.log(jQuery(this));
    console.log(filename);
    console.log(idname);
    jQuery('span.' + idname).next().find('span').html(filename);
    document.getElementById("check2").style.display = "initial";
    document.getElementById("code2").style.backgroundColor = "gray";
    $("#code2").prop("disabled", false);
  }
});



form.onsubmit = (e) => {
  e.preventDefault();
}


function editar() {
  var codigo = document.getElementById("area").value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/editar.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        readTextFile("tmp/" + fichero1);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El archivo ha sido editado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  let formData = new FormData(form);
  formData.append('codigo', codigo);
  formData.append('fichero', fichero1);
  xhr.send(formData);
}

function editar2() {
  var codigo = document.getElementById("area2").value;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/editar.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        readTextFile2("tmp/" + fichero2);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El archivo ha sido editado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
  let formData = new FormData(form);
  formData.append('codigo', codigo);
  formData.append('fichero', fichero2);
  xhr.send(formData);
}

function leer_fichero1() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/files_upload.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        $nombre_fichero = JSON.parse(xhr.responseText);
        fichero1 = "../../tmp/" + $nombre_fichero;
        readTextFile("tmp/" + $nombre_fichero);
      }
    }
  }
  let formData = new FormData(form);
  formData.append('flag', 'code');
  formData.append('fichero', 'archivo');
  xhr.send(formData);
}

function leer_fichero2() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/files_upload.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        $nombre_fichero = JSON.parse(xhr.responseText);
        fichero2 = "../../tmp/" + $nombre_fichero;
        readTextFile2("tmp/" + $nombre_fichero);

      }
    }
  }
  let formData = new FormData(form);
  formData.append('flag', 'code');
  formData.append('fichero', 'archivo2');
  xhr.send(formData);
}

continueBtn.onclick = () => {
  leer_fichero1();
}
continueBtn2.onclick = () => {
  leer_fichero2();
}

function readTextFile(fichero) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", fichero, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("contenido").innerHTML =
        `<textarea  name="textarea" id="area" rows="16" cols="92">` +
        allText + `</textarea>` +
        `
        <div>
          <button onclick="exitBtn()" data-bs-toggle="tooltip" data-bs-placement="top" title="Limpiar código" class="btn-secondary recargar">
          <i class="fas fa-broom"></i>
          </button>

          <button onclick="editar()" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar código" class="btn-secondary recargar">
          <i class="fas fa-pen"></i>
          </button>

          <button onclick="leer_fichero1()" data-bs-toggle="tooltip" data-bs-placement="top" title="Actualizar código" class="btn-secondary recargar" id="recargar">
          <i class="fas fa-sync-alt"></i>
          </button>


        </div>`;
    }
  }
  rawFile.send();
}

function readTextFile2(fichero) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", fichero, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("contenido2").innerHTML =
        `<textarea  name="textarea2" id="area2" rows="16" cols="92">` +
        allText + `</textarea>` +
        ` <div>
        <button onclick="exitBtn2()" data-bs-toggle="tooltip" data-bs-placement="top" title="Limpiar codigo" class="btn-secondary recargar">
        <i class="fas fa-broom"></i>
        </button>

        <button onclick="editar2()" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar codigo" class="btn-secondary recargar">
        <i class="fas fa-pen"></i>
        </button>

        <button onclick="leer_fichero2()" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar codigo" class="btn-secondary recargar" id="recargar2">
        <i class="fas fa-sync-alt"></i>
        </button>


      </div>`;
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

function documento1() {
  var doc1 = document.getElementById("area").value;
  document.getElementById("resultados").innerHTML = doc1;
  return doc1;
}

function documento2() {
  var doc2 = document.getElementById("area2").value;
  return doc2;
}

function refresh() {
  window.location.reload();
}

function jaccard() {

  var texto = "";
  var similitud = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/jaccard.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        texto = JSON.parse(xhr.responseText);
        const myArray = texto.split(",");
        similitud = parseInt(myArray[0]);
        variables.push(fichero1);
        variables.push(fichero2);
        if (similitud >= 0 && similitud <= 30) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:green"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_jaccard()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf()"><i class="fas fa-file-pdf"></i> PDF</button>', 'green');
        }
        if (similitud > 30 && similitud <= 60) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:orange"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_jaccard()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf()"><i class="fas fa-file-pdf"></i> PDF</button>', 'orange');
        }
        if (similitud > 60 && similitud <= 100) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:red"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_jaccard()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf()"><i class="fas fa-file-pdf"></i> PDF</button>', 'red');
        }


      }
    }
  }
  let formData = new FormData(form);
  formData.append('documento_1', fichero1);
  formData.append('documento_2', fichero2);
  xhr.send(formData);
}

function mapa_jaccard() {
  var variables_totales = [...new Set(variables)];
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/jaccardtocsv.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        Swal.fire({
          html: '<img class="w-100" src="../INCLUDES/funciones/mapa.php"></img>',
          width: 800,
          padding: '3em',
          color: 'green'
        }).then((result) => {
          if (result.value) {
            var params = "hola?";
            $.ajax({
              data: params, //Aqui envias algun parametro en tu caso puede ser la fecha y hora mediante json
              url: '../INCLUDES/funciones/mapa.php',
              dataType: 'html',
              type: 'post',
              success: function (response) {
                  console.log("Exito");
              }
            });
          }
        })
      }
    }
  }
  let formData = new FormData(form);
  for (let i = 0; i < variables_totales.length; i++) {
    formData.append('array' + i, variables_totales[i]);
    formData.append('size', variables_totales.length);
  }
  xhr.send(formData);
}

function mapa_coseno() {
  var variables_totales = [...new Set(variables_coseno)];
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/cosenotocsv.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        Swal.fire({
          html: '<img class="w-100" src="../INCLUDES/funciones/mapa_coseno.php"></img>',
          width: 800,
          padding: '3em',
          color: 'green'
        }).then((result) => {
          if (result.value) {
            var params = "hola?";
            $.ajax({
              data: params, //Aqui envias algun parametro en tu caso puede ser la fecha y hora mediante json
              url: '../INCLUDES/funciones/mapa_coseno.php',
              dataType: 'html',
              type: 'post',
              success: function (response) {
                  console.log("Exito");
              }
            });
          }
        })

      }
    }
  }
  let formData = new FormData(form);
  for (let i = 0; i < variables_totales.length; i++) {
    formData.append('array' + i, variables_totales[i]);
    formData.append('size', variables_totales.length);
  }
  xhr.send(formData);
}


function mapa_semantica() {
  var variables_totales = [...new Set(variables_semantica)];
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/semanticatocsv.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        Swal.fire({
          html: '<img class="w-100" src="../INCLUDES/funciones/mapa_semantica.php"></img>',
          width: 800,
          padding: '3em',
          color: 'green'
        }).then((result) => {
          if (result.value) {
            var params = "hola?";
            $.ajax({
              data: params, //Aqui envias algun parametro en tu caso puede ser la fecha y hora mediante json
              url: '../INCLUDES/funciones/mapa_semantica.php',
              dataType: 'html',
              type: 'post',
              success: function (response) {
                  console.log("Exito");
              }
            });
          }
        })

      }
    }
  }
  let formData = new FormData(form);
  for (let i = 0; i < variables_totales.length; i++) {
    formData.append('array' + i, variables_totales[i]);
    formData.append('size', variables_totales.length);
  }
  xhr.send(formData);
}

function coseno() {
  var texto = "";
  var similitud = 0;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/coseno.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        text = JSON.parse(xhr.responseText);
        const myArray = text.split(",");
        similitud = parseInt(myArray[0]);
        variables_coseno.push(fichero1);
        variables_coseno.push(fichero2);
        if (similitud >= 0 && similitud <= 30) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:green"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_coseno()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_coseno.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_coseno()"><i class="fas fa-file-pdf"></i> PDF</button>', 'green');
        }
        if (similitud > 30 && similitud <= 60) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:orange"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_coseno()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_coseno.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_coseno()"><i class="fas fa-file-pdf"></i> PDF</button>', 'orange');
        }
        if (similitud > 60 && similitud <= 100) {
          porcentaje_similitud('<div style="width: 100%; height: 2rem; background-color:red"></div><p>Resultados de similitud</p><h1 style="font-size: 95px">' + similitud + '% </h1><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[1] + ' segundos </p><button class="btn-coderaizer btn actualizar" onclick="mapa_coseno()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_coseno.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_coseno()"><i class="fas fa-file-pdf"></i> PDF</button>', 'red');
        }


      }
    }
  }
  let formData = new FormData(form);
  formData.append('documento_1', fichero1);
  formData.append('documento_2', fichero2);
  xhr.send(formData);
}

function semantica() {
  var texto = "";
  var similitud = 0;
  var testing = "";
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "INCLUDES/funciones/semantica.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        testing = JSON.parse(xhr.responseText);
        const myArray = testing.split(",");
        similitud = parseInt(myArray[1]);
        similitud2 = parseInt(myArray[0]);
        variables_semantica.push(fichero1);
        variables_semantica.push(fichero2);
        if (similitud > 0 && similitud <= 30) {
          porcentaje_similitud('<div class="semantica_parent"><div  style="width: 100%; height: 2rem; background-color:green" class="doc1"> <div style="width: 100%; height: 2rem; background-color:green"></div><p>Documento #1</p><h1 style="font-size: 70px">' + similitud + '% </h1></div><div class="doc2"> <div style="width: 100%; height: 2rem; background-color:green"></div><p>Documento #2</p><h1 style="font-size: 70px">' + similitud2 + '% </h1></div><br><br><div class="doc3"><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[2] + ' segundos </p></div><button class="btn-coderaizer btn actualizar" onclick="mapa_semantica()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_semantica.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_semantica()"><i class="fas fa-file-pdf"></i> PDF</button>', 'green');
        }
        if (similitud >= 30 && similitud <= 60) {
          porcentaje_similitud('<div class="semantica_parent"><div  style="width: 100%; height: 2rem; background-color:orange" class="doc1"> <div style="width: 100%; height: 2rem; background-color:orange"></div><p>Documento #1</p><h1 style="font-size: 70px">' + similitud + '% </h1></div><div class="doc2"> <div style="width: 100%; height: 2rem; background-color:orange"></div><p>Documento #2</p><h1 style="font-size: 70px">' + similitud2 + '% </h1></div><br><br><div class="doc3"><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[2] + ' segundos </p> </div><button class="btn-coderaizer btn actualizar" onclick="mapa_semantica()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_semantica.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_semantica()"><i class="fas fa-file-pdf"></i> PDF</button>', 'orange');
        }
        if (similitud > 60 && similitud <= 100) {
          porcentaje_similitud('<div class="semantica_parent"><div  style="width: 100%; height: 2rem; background-color:red" class="doc1"> <div style="width: 100%; height: 2rem; background-color:red"></div><p>Documento #1</p><h1 style="font-size: 70px">' + similitud + '% </h1></div><div class="doc2"> <div style="width: 100%; height: 2rem; background-color:red"></div><p>Documento #2</p><h1 style="font-size: 70px">' + similitud2 + '% </h1></div><br><br><div class="doc3"><p style="color: rgb(112,117,122)">La consulta tardó: ' + myArray[2] + ' segundos </p></div> <button class="btn-coderaizer btn actualizar" onclick="mapa_semantica()"><i class="far fa-image"></i> Ver mapa</button><button class="btn-coderaizer btn actualizar"><a href="code/mapa_semantica.csv" download="mapa"><i class="fas fa-file-csv"></i> CSV </a></button> <button class="btn-coderaizer btn actualizar" onclick="generar_pdf_semantica()"><i class="fas fa-file-pdf"></i> PDF</button>', 'red');
        }


      }
    }
  }
  let formData = new FormData(form);
  formData.append('documento_1', fichero1);
  formData.append('documento_2', fichero2);
  xhr.send(formData);
}



function generar_pdf() {
  try {
    window.open('../INCLUDES/funciones/mapa.php', 'popup', 'top=100, left=550, width=460, height=580, toolbar=NO, resizable=NO, Location=NO, Menubar=NO, Titlebar=No, Status=NO')
  } catch (error) {
    error('Primero debe generar un análisis');
  }
}

function generar_pdf_coseno() {
  try {
    window.open('../INCLUDES/funciones/mapa_coseno.php', 'popup', 'top=100, left=550, width=460, height=580, toolbar=NO, resizable=NO, Location=NO, Menubar=NO, Titlebar=No, Status=NO')
  } catch (error) {
    error('Primero debe generar un análisis');
  }
}

function generar_pdf_semantica() {
  try {
    window.open('../INCLUDES/funciones/mapa_semantica.php', 'popup', 'top=100, left=550, width=460, height=580, toolbar=NO, resizable=NO, Location=NO, Menubar=NO, Titlebar=No, Status=NO')
  } catch (error) {
    error('Primero debe generar un análisis');
  }
}


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)

})

function porcentaje_similitud(texto, color) {
  Swal.fire({
    html: texto,
    width: 600,
    padding: '3em',
    color: color
  })
}

function error(texto) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: texto
  })
}

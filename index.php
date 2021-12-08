<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador</title>
    <!--  <link rel="stylesheet" href="/css/sesion.css"> -->
    <link rel="stylesheet" href="css/coderaizer.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">

</head>

<body>
    <section class="form signup">
        <form action="#" method="POST" enctype="multipart/form-data" autocomplete="off">
            <div class="error-text"></div>
            <div class="parent">

                <div class="lenguajes">
                    <ul class="nav nav-pills nav-fill">
                        <li class="nav-item">
                            <a class="nav-link nav-active" aria-current="page" href="coderaizer.php">Python</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-default " href="coderaizer.php">Java</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link nav-default " href="coderaizer.php">C++</a>
                        </li>
                    </ul>

                </div>
                <div class="codigo1 text-center rounded" id="codigo1">
                    <div class="div1">
                    <div class="mt-4 mb-4">Selecciona el archivo #1<br>
                        <div class="text-formats">Solo se permite formatos .py</div><br>
                        <span class="archivo">
                            <input type="file" name="archivo" id="archivo" accept="archivo/py" required>
                        </span>
                        <label for="archivo" class="rounded">
                            <span>
                                <i class="fas fa-file-upload"></i> Subir archivo
                            </span>
                        </label>
                        <button class="check1" id="check1"><i class="fas fa-check-circle"></i></button>
                    </div>
                    </div>

                    <div class="div2" id="contenido">
                    
                    </div>

                </div>
                <div class="controles">
                    <div class="field button">
                        <button class="btn-coderaizer btn btn-primary" onclick="accion()"> = </button>
                    </div>
                </div>
                <div class="codigo2 text-center" id="codigo2">
                    <div class="div3">
                    <div class="mt-4 mb-4">Selecciona el archivo #2<br>
                        <div class="text-formats">Solo se permite formatos .py</div><br>
                        <span class="archivo2">
                            <input type="file" name="archivo2" id="archivo2" accept="archivo2/py" required>
                        </span>
                        <label for="archivo2" class="rounded">
                            <span>
                                <i class="fas fa-file-upload"></i> Subir archivo
                            </span>
                        </label>
                        <button class="check2" id="check2"><i class="fas fa-check-circle"></i></button>
                    </div>
                    </div>

                    <div class="div4" id="contenido2">

                    </div>

                </div>

                <div class="resultados">
                    <div class="numerico" id="resultado_numerico">

                    </div>
                    <div class="grafico" id="grafico">

                    </div>
                </div>

            </div>
        </form>
    </section>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"> </script>
<!-- <script src="/js/script_dashboard.js"></script> -->
<script src="/js/coderaizer.js"></script>
<!-- <script src="/js/chat.js"></script> -->

<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</html>

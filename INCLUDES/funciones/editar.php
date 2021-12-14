<?php
  $fichero = $_POST['fichero'];
  $texto = $_POST['codigo'];
  file_put_contents($fichero, trim($texto));
  echo "Modificado correctamente";
?>
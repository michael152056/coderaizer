<?php
    $documento1 = $_POST['documento_1'];
    $documento2 = $_POST['documento_2'];
    $param = 'metodo';
    $ejec =  exec("python ../../code/semantica.py $documento1 $documento2 $param");
    echo json_encode($ejec);                         
?>
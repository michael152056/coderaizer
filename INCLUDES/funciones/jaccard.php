<?php
                
    $documento1 = $_POST['documento_1'];
    $documento2 = $_POST['documento_2'];;
    $tmp =  exec("python ../../code/coderaizer.py $documento1 $documento2 ");
    echo json_encode($tmp);                    
          
?>
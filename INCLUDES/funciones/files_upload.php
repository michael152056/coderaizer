<?php
$flag = $_POST['flag'];
$fichero = $_POST['fichero'];

if($flag == "code"){
   
    $img_name = $_FILES[$fichero]['name'];
    $img_type = $_FILES[$fichero]['type'];
    $tmp_name = $_FILES[$fichero]['tmp_name'];
    $img_explode = explode('.',$img_name);
    $img_ext = end($img_explode);

            $time = time();
            $new_img_name = $time.$img_name;
            if(move_uploaded_file($tmp_name,"../../temp/".$new_img_name)){
               echo json_encode($new_img_name);
            }
}
?>
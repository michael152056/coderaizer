<?php
header("Content-Type: image/png");
$stuff = system('python ../../code/heatmap.py', $output);
foreach($output as $key=>$value){
    if($key==1)
        print chr(0x0D); //Newline feed after PNG declaration
    if($key>0)
        print "\n";
    print $value;
}
?>

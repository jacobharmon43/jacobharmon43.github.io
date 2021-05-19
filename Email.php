<?php
    if(isset($_POST['submit'])){
        $email = $_POST['email'];
        $subject = $_POST['Subject'];
        $content = $_POST['content'];
        $to = "jacobharmon43@gmail.com";
        $headers = "From:" . $email;
        mail($to, $subject, $content, $headers);
    }
?>
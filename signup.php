<?php
    // ตรวจสอบว่ามีการส่งข้อมูลแบบ POST มาหรือไม่
    include("config.php");
                
        // รับข้อมูลจากแบบฟอร์ม
        $email = strip_tags(mysqli_real_escape_string($objCon, $_POST['email']));;
        $username = strip_tags(mysqli_real_escape_string($objCon, $_POST['username']));;
        $password = strip_tags(mysqli_real_escape_string($objCon, $_POST['psw']));;
        $passwordRepeat = strip_tags(mysqli_real_escape_string($objCon, $_POST['psw-repeat']));
                
        // ตรวจสอบว่ารหัสผ่านและรหัสผ่านที่ทำซ้ำตรงกันหรือไม่
        if ($password != $passwordRepeat) {
            echo "Passwords do not match";
        } else {
            // เตรียมคำสั่ง SQL เพื่อเพิ่มผู้ใช้ใหม่
            $sql = "INSERT INTO users (email, username ,password) VALUES ('$email','$username', '$password')";
            $objQuery = mysqli_query($objCon, $sql);
                
            if ($objQuery) {
                echo "New record created successfully";
                header("Location: index.html");
                exit();
            } else {
                echo "ERROR";
            }
        }
        mysqli_close($objCon);  
?>
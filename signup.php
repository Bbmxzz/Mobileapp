<?php
    // ตรวจสอบว่ามีการส่งข้อมูลแบบ POST มาหรือไม่
    include("config.php");
                
        // รับข้อมูลจากแบบฟอร์ม
        $email = strip_tags(mysqli_real_escape_string($objCon, $_POST['email']));;
        $password = strip_tags(mysqli_real_escape_string($objCon, $_POST['psw']));;
        $passwordRepeat = strip_tags(mysqli_real_escape_string($objCon, $_POST['psw-repeat']));
                
        // ตรวจสอบว่ารหัสผ่านและรหัสผ่านที่ทำซ้ำตรงกันหรือไม่
        if ($password != $passwordRepeat) {
            echo "Passwords do not match";
        } else {
            // เตรียมคำสั่ง SQL เพื่อเพิ่มผู้ใช้ใหม่
            $sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
            $objQuery = mysqli_query($objCon, $sql);
                
            if ($objQuery) {
                echo "New record created successfully";
                echo "<a href='index.html'>login</a>";
            } else {
                echo "ERROR";
            }
        }
        mysqli_close($conn);  
?>

<!--$servername = "sql202.infinityfree.com";
        $username = "if0_36017330";
        $password = "KGccg6JnUuoDqylQS";
        $dbname = "if0_36017330_login";
                
        $conn = new mysqli($servername, $username, $password, $dbname);-->
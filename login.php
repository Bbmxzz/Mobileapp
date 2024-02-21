<?php
        include("config.php"); // นำเข้าไฟล์ config.php ที่เชื่อมต่อฐานข้อมูล

        // รับข้อมูลจากแบบฟอร์ม
        $email = strip_tags(mysqli_real_escape_string($objCon, $_POST['email']));;
        $password = strip_tags(mysqli_real_escape_string($objCon, $_POST['password']));;

        // ตรวจสอบข้อมูลในฐานข้อมูล
        $sql = "SELECT * FROM users WHERE email='$email'";
        $objQuery = mysqli_query($objCon, $sql);

        if (mysqli_num_rows($objQuery) > 0) {
            // มีผู้ใช้งานนี้อยู่ในฐานข้อมูล
            $row = mysqli_fetch_assoc($objQuery);
            $stored_password = $row['password'];
            if ($password== $stored_password) {
                // รหัสผ่านถูกต้อง
                echo "Login successful!";
                header("Location: Todolist.html");
                exit();
            } else {
                // รหัสผ่านไม่ถูกต้อง
                echo "Incorrect password!";
                echo "$password";
                echo "$stored_password";
            }
        } else {
            // ไม่พบผู้ใช้งานนี้ในฐานข้อมูล
            echo "User not found!";
        }


        // ปิดการเชื่อมต่อกับฐานข้อมูล
        mysqli_close($objCon);
?>
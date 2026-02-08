<?php
include "db.php";

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $department = $_POST['department'];

    $sql = "INSERT INTO student (name, email, mobile, department)
            VALUES ('$name', '$email', '$mobile', '$department')";
    mysqli_query($conn, $sql);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student CRUD Application</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-image: url('MIT-WPU (1).jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 0;
            padding: 0;
        }

        .overlay {
            background-color: rgba(230, 245, 255, 0.9);
            min-height: 100vh;
            padding: 30px;
        }

        h2 {
            color: #0077b6;
            text-align: center;
        }

        .form-box {
            background: #ffffff;
            width: 40%;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        input[type="text"],
        input[type="email"] {
            width: 100%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        button {
            background-color: #0077b6;
            color: white;
            padding: 10px;
            border: none;
            width: 100%;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #005f8f;
        }

        table {
            width: 90%;
            margin: 30px auto;
            border-collapse: collapse;
            background: white;
        }

        th {
            background-color: #90e0ef;
            padding: 10px;
        }

        td {
            padding: 8px;
            text-align: center;
        }

        a {
            color: #0077b6;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
<div class="overlay">

    <h2>Student Registration Form</h2>

    <div class="form-box">
        <form method="POST">
            Name:
            <input type="text" name="name" required><br><br>

            Email:
            <input type="email" name="email" required><br><br>

            Mobile:
            <input type="text" name="mobile" required><br><br>

            Department:
            <input type="text" name="department" required><br><br>

            <button type="submit" name="submit">Add Student</button>
        </form>
    </div>

    <h2>Student Records</h2>

    <table border="1">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Actions</th>
        </tr>

        <?php
        $result = mysqli_query($conn, "SELECT * FROM student");

        while ($row = mysqli_fetch_assoc($result)) {
            echo "<tr>";
            echo "<td>".$row['id']."</td>";
            echo "<td>".$row['name']."</td>";
            echo "<td>".$row['email']."</td>";
            echo "<td>".$row['mobile']."</td>";
            echo "<td>".$row['department']."</td>";
            echo "<td>
                <a href='edit.php?id=".$row['id']."'>Edit</a> |
                <a href='delete.php?id=".$row['id']."' onclick='return confirm(\"Are you sure?\")'>Delete</a>
            </td>";
            echo "</tr>";
        }
        ?>
    </table>

</div>
</body>
</html>

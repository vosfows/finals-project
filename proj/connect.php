
<?php
    echo "string";
	$user = $_POST['user'];
    $pass = $_POST['pass'];
    echo "string";
    // Data Connect

    $conn = new mysqli("localhost","root","","website");
    echo "string";
    if($conn->connect_error){
        die("Failed to connect : ".$conn->connect_error);
    } else{
    	echo "pasok";
        $stmt = $conn->prepare("select * from pinuno where user = ?");
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $stmt_result = $stmt->get_result();

        if($stmt_result->num_rows > 0) {
        	echo "pasok uli";
            $data = $stmt_result->fetch_assoc();

            if($data['pass'] === $pass) {
            	echo "pumasok na";
                header('Location: authorize.html');
            }
        } else {
            
        }

    }
?>





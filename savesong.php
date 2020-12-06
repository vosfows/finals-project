
<?php
    $user = $_POST['title'];
    $pass = $_POST['id'];
   
    $conn = new mysqli("localhost","root","","website");

    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
     $sql =  "INSERT INTO links (`item_id`, `title`, `song_id`) VALUES (NULL, '".$user."', '". $pass."');";

    /*if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
*/

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        
    } else {
      echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
/*
        if($conn->connect_error){
            echo "connection failure";
        die("Failed to connect : ".$conn->connect_error);
        } else{
            echo "put";
            $stmt = $conn->prepare();
             $stmt->execute();     
            

       
           
            echo "put done";
        }
    


    /*
    if (isset($_POST['save']) == 'song0') {
        $dom = new DomDocument();
        

    //@ $dom->loadHTMLFile('music_admin.php');

        $frame = $dom->getElementById('frame0') ;
        $frame_attrib =  $frame->getAttribute('src');

        $link = 'a';
        //<script type="text/javascript"> $document.getElementById('song0').getAttribute('src'); </javascript>
        save($frame);
    }
*/


    

?> 





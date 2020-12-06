<!DOCTYPE html>
<html>
<head>

    <title>Music Admin</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
</head>
<body>
    <form  method ="post" >
    <h1> ADD MUSIC</h1>
    <div class="textbox" >

                <input type="user" placeholder="Song Title" name="title" id="stitle" required>
    </div>
            <input type="hidden" id="hidden" name="hidden" value="...">
        
            <div class="textbox">
                <input type="search" placeholder="ID" name="id" id="id--" required>
                <input type="text" name="title" placeholder="Update the Title"> <br>

            </div>

                <input class="btn" type="button" name="search" value="Search Music" id="searchbutton">
                <input class="btn" type="submit" name="create" value="Recommend">
                  <input class="btn" type="button" name="read" value="Refresh" id="read">
                 <input class="btn" type="button" name="title" value="Update">


              
                
               
        </div>
       <div class="row">
            <div class="col-sm-3 col-md-6">    
                <div id="music">
                  
                </div>             
            </div>
        </div>
        <br>
            <div class="d-flex-table-data">
            <table class="table table-stripped table-dark">
                <thread class="thread-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Song Link</th>
                        <th>Actions</th>
                    </tr>
                </thread>
                <tbody id="tbody">
                    <?php 

                        $conn = new mysqli("localhost","root","","website");
                        if($conn->connect_error){
                            die("Failed to connect : ".$conn->connect_error);
                        } else{
                            $stmt = $conn->prepare("SELECT * FROM `links`");
                            $stmt->execute();
                            $stmt_result = $stmt->get_result();


                            $stmt2 = $conn->prepare("SELECT COUNT(`item_id`) FROM `links`");
                            $stmt2->execute();
                            
                            $count = $stmt2->get_result();

                            $row = mysqli_fetch_array($count);
                           

                            for ($i=0; $i < $row[0]; $i++) { 
                                $data = $stmt_result->fetch_assoc();
                                echo '<script type="text/javascript"> 
                                    var makeIframe = document.createElement("iframe");
                                        makeIframe.setAttribute("width", "300");
                                        makeIframe.setAttribute("height", "350");
                                        makeIframe.setAttribute("frameborder", "0");
                                        makeIframe.setAttribute("transparency", "true");
                                        makeIframe.setAttribute("id", "frameid");
                                        makeIframe.setAttribute("allow", 
                                        "encrypted-media");
                                        makeIframe.setAttribute("src", 
                                        "https://open.spotify.com/embed/track/' . $data['song_id'] .'");
                                      
                                    document.getElementById("tbody").appendChild(makeIframe);


                                     </script>';
                            }

                            if($stmt_result->num_rows > 0) {
                                
                            } else {
                                
                            }

                        }







                    if (isset($_POST['hidden'])) {
                        $result = getData();

                        if ($result) {
                            while ($row = mysqli_fetch_assoc($result)) {?>
                                <tr>
                                    <td data-id="<?php echo $row['id']; ?>"><?php echo $row['item_id']; ?></td>
                                    <td data-id="<?php echo $row['id']; ?>"><?php echo $row['title']; ?></td>
                                    <td data-id="<?php echo $row['id']; ?>"><?php echo $row['song_id']; ?></td>

                                </tr>
                                <?php
                            }
                        }
                    }
                    ?>
                    
                </tbody>
        </div>

    </form>

    <script src="adminjs.js" ></script>
    <script src="display.js" ></script>
</body>
</html>


<?php 
   



?>


<?php

 
    
    if (isset($_POST['id'])) {
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
    }

    function connect(){

    }

    function refresh(){




    }



   
?>

<?php
   $conn = new mysqli("localhost","root","");
   $db = mysqli_select_db($conn,"website");


    if(isset($_POST['update']))
    {
        $id = $_POST['id'];
        
        $query = "UPDATE 'links' SET title='$_POST[title]' where id='$_POST[id]'";
        $query_run = mysqli_query($conn,$query);
        
        if($query_run)
        {
            echo '<script type="text/javascript"> alert("Data Updated") </script>';
            
        }
        else
        {
            echo '<script type="text/javascript"> alert("Data not Updated") </script>';
        }
    }
?>

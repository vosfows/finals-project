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

                    if (isset($_POST['read'])) {
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
    if (isset($_POST['read'])) {
       echo "what";
    }
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

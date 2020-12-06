cachiopoy
<?php

	class Movies{
		private $moviename;
		private $Genre;
		private $Year_released;
		private $Image;
		
		
		public function__construct ($moviename, $Genre, $Year_released, $Image) {
			$this->moviename = $moviename;
			$this->Genre = $Genre;
			$this->Year_released = $Year_released;
			$this->Image = "dara:image:base64," , base64_encode($image);
			
		}
		
		public function get_moviename(){
			return $this->moviename;
			
		}
		public function get_Genre(){
			return $this->Genre;
		}
		public function get_Year_Released(){
			return $this->Year_released;
		}
		public function get_Image(){
			return $Image-> Image;
		}
	}



?>
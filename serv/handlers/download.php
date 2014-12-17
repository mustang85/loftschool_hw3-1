<?php 
	include_once '../config.php';

	$target_image = $path.str_replace('^', '/', $_POST['image']);
	$target_wm = $path.str_replace('^', '/', $_POST['wm']);
	$opacity = $_POST['opacity'];

	if (isset($_POST['xValue']) && isset($_POST['yValue'])) {
		$x = $_POST['xValue'];
		$y = $_POST['yValue'];
	} else if (isset($_POST['xBorder']) && isset($_POST['yBorder'])) {
		$xB = $_POST['xBorder'];
		$yB = $_POST['yBorder'];
	}

	//Create Image
	if (exif_imagetype($target_image) === IMAGETYPE_JPEG) {
		$img = imagecreatefromjpeg($target_image);
	} else if (exif_imagetype($target_image) === IMAGETYPE_PNG) {
		$img = imagecreatefrompng($target_image);
	}
	//Create Watermark
	if (exif_imagetype($target_wm) === IMAGETYPE_JPEG) {
		$wm = imagecreatefromjpeg($target_wm);
	} else if (exif_imagetype($target_wm) === IMAGETYPE_PNG) {
		$wm = imagecreatefrompng($target_wm);
	}

	imagealphablending($wm, true); 
	imagesavealpha($wm, true);

	imagecopymerge($img, $wm, 0, 0, -$x, -$y, imagesx($wm), imagesy($wm), $opacity);

	$flpath = $path.$created; //File Path to generated image

	imagejpeg($img, $flpath);
	imagedestroy($img);

	$result = array(
		'link' => $created
	);

	echo $result);
?>
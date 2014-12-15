<?php 
	$target_image = $_SERVER["DOCUMENT_ROOT"].'wmapp/'.str_replace('^', '/', $_POST['image']);
	$target_wm = $_SERVER["DOCUMENT_ROOT"].'wmapp/'.str_replace('^', '/', $_POST['wm']);
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

	// Вывод и освобождение памяти
	// header('Content-type: image/png');
	// header('Content-Disposition: attachment; filename=generated.png');
	imagepng($img, $_SERVER["DOCUMENT_ROOT"].'wmapp/generated/generated.png');
	imagedestroy($img);

	$result = array(
		'link' => 'generated/generated.png'
	);

	echo json_encode($result);
?>
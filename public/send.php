<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php include 'includes/head.php'; ?>
	<link rel="stylesheet" href="styles/send.css">
</head>

<body>

	<?php include 'includes/header.php'; ?>

	<main>
		<div id="particles-js"> </div>
		<div class="container">
			<div class="card" id="dropZone">
				<button id="sendBtn" class="btn send">
					<span id="plusIcon" class="plus">+</span>
				</button>
				<div id="fileList" class="file-list"></div>
				<input type="file" id="fileInput" multiple style="display: none;">
				<button id="actualSendBtn" class="custom-btn">SEND</button>
			</div>
			<div id="ipDisplay">
				<p>Your IP Address: <span id="ipAddr"></span></p>
			</div>
			<div id="tagline">
				<p> Intra WebShare redefines file sharing by enabling <br> effortless peer-to-peer sharing ... </p>
			</div>
			
		</div>
	</main>

	<?php include 'includes/footer.php'; ?>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
	<script src="scripts/send.js"></script>

</body>

</html>
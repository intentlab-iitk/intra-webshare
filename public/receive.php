<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php include 'includes/head.php'; ?>
  <link rel="stylesheet" href="styles/receive.css">
</head>

<body>

  <?php include 'includes/header.php'; ?>

  <main>
    <div id="particles-js"></div>
      <div class="container">
        <div id="responseDisplay">Waiting for data ...</div>
        <input type="text" id="boxSenderIP" placeholder="Enter Sender's IP here" required />
        <button id="receiveButton" class="custom-btn">Receive</button>
      </div>
  </main>

  <?php include 'includes/footer.php'; ?>
  <script src="scripts/receive.js"></script>

</body>

</html>
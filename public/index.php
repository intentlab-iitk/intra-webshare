<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <?php include 'includes/head.php' ?>
    <link rel="stylesheet" href="styles/index.css">
</head>

<body>

    <?php include 'includes/header.php'; ?>

    <main>
        <!-- Particle.js -->
        <div id="particles-js"></div>
        <!-- Main -->
        <div class="container">
            <div id="button-container">
                <button id="send-btn" class="custom-btn" onclick="location.href='send.php'">Send</button>
                <button id="receive-btn" class="custom-btn" onclick="location.href='receive.php'">Receive</button>
            </div>
            <div id="tagline">
                <p> Intra WebShare redefines file sharing by enabling <br> effortless peer-to-peer sharing ... </p>
            </div>
        </div>
    </main>

    <?php include 'includes/footer.php'; ?>

</body>

</html>
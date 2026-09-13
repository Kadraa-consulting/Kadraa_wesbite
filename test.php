<?php
    if (isset($_POST["message"])) {
        $message = "Ce message vous a été envoyé  via la page contact du site exemplesite.fr 
        Nom : " . $_POST["name"] . "
        Email : " . $_POST["email"] . "
        Message : " . $_POST["description"];

        $retour = mail("outlook.com", $_POST["companyName"], $message, 
        "From:contact@exemplesite.fr" . "\r\n" . "Reply-to" 
        . $_POST["email"]);
        if ($retour) {
            echo "<p>L'email a bien été envoyé.</p>";
        }
    }
?>
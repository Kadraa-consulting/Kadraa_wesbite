const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON des requêtes
app.use(bodyParser.json());

// Route pour gérer le formulaire
app.post('/submit-form', (req, res) => {
    const { companyName, name, email, website, description } = req.body;

    // Log des données reçues (vous pouvez les sauvegarder dans une base de données)
    console.log('Form data:', { companyName, name, email, website, description });

    // Réponse au client
    res.json({ message: 'Formulaire soumis avec succès !' });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


fetch('http://localhost:3000/submit-form', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})






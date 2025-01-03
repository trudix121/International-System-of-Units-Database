

const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../.env'})
function cookiejwt(req, res, next) {
    const token = req.cookies.token; // Extrage token-ul din cookie

    if (!token) {
        return res.status(401).json({ message: 'Autentificare necesară.' });
    }

    try {
        const secretKey = process.env.JWT; // Cheia secretă
        const decoded = jwt.verify(token, secretKey); // Validează token-ul
        req.user = decoded; // Adaugă datele utilizatorului în req
        next(); // Trece la următorul middleware
    } catch (err) {
        return res.status(403).json({ message: 'Token invalid sau expirat.' });
    }
}

module.exports = cookiejwt;

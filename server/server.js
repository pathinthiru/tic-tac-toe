const express = require('express');
const socketIo = require('socket.io');
const qrcode = require('qrcode');
const path = require('path');

const app = express();  // This initializes the app

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketIo(server);

// Serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API to get the QR code
app.get('/qr', (req, res) => {
  const localIp = 'http://192.168.x.x:3000'; // Replace with your computer's local IP
  qrcode.toDataURL(localIp, (err, qrCodeData) => {
    if (err) {
      res.status(500).send('Error generating QR code');
      return;
    }
    res.json({ qrCode: qrCodeData });
  });
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

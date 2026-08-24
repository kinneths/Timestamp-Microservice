const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS so freeCodeCamp tests can access your API
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Endpoint for empty date requests (Tests 7 & 8)
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Endpoint for specific dates (Tests 2, 3, 4, 5 & 6)
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Handle Unix timestamp inputs (e.g. 1451001600000)
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
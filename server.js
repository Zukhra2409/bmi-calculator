const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = Number(req.body.weight);
  const height = Number(req.body.height);

  if (!Number.isFinite(weight) || !Number.isFinite(height) || weight <= 0 || height <= 0) {
    return res.redirect('/?error=1');
  }

  const bmiValue = weight / (height * height);
  const bmi = bmiValue.toFixed(2);

  let category;
  let colorClass;

  if (bmiValue < 18.5) {
    category = 'Underweight';
    colorClass = 'underweight';
  } else if (bmiValue < 25) {
  category = 'Normal weight';
  colorClass = 'normal';
} else if (bmiValue < 30) {
  category = 'Overweight';
  colorClass = 'overweight';
} else {
  category = 'Obese';
  colorClass = 'obese';
}
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>BMI Result</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <main class="page">
    <section class="card result ${colorClass}">
      <h1>Your BMI Result</h1>

      <div class="row">
        <span class="label">BMI</span>
        <span class="value">${bmi}</span>
      </div>

      <div class="row">
        <span class="label">Category</span>
        <span class="value">${category}</span>
      </div>

      <a class="link" href="/">Go back</a>
    </section>
  </main>
</body>
</html>
`);
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});

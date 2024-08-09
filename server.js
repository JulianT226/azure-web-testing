const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/process-form', async (req, res) => {
  const { firstName, lastName} = req.body;

  // Your Puppeteer code to fill out the form using the received data
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://pptform.state.gov/PassportWizardMain.aspx');
  await page.type('#PassportWizard_aboutYouStep_firstNameTextBox', firstName);
  await page.type('#PassportWizard_aboutYouStep_lastNameTextBox', lastName);
  // Fill in the rest of the fields
  await browser.close();

  res.json({ status: 'Form submitted successfully!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
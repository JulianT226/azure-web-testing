const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/process-form', async (req, res) => {
  const { firstName, lastName, middleName, suffix } = req.body;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('https://pptform.state.gov/PassportWizardMain.aspx');
    
    // Assume similar form filling with Puppeteer as your original script
    await page.type('#PassportWizard_aboutYouStep_firstNameTextBox', firstName);
    await page.type('#PassportWizard_aboutYouStep_lastNameTextBox', lastName);
    // Continue with other fields...

    await browser.close();
    res.json({ status: 'success', message: 'Form processed successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Form processing failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
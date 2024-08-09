const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const path = require('path'); // Add this

const app = express();

// Serve static files from the "public" directory (assuming index.html is in the root)
app.use(express.static(path.join(__dirname, 'public'))); // Adjust the path if necessary

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint for form submission
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

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path if needed
});

// Start the server
app.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`));
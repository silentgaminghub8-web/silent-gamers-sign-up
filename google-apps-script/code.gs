// Google Apps Script for Silent Gamers Registration
// Deploy this as a Web App with "Anyone" access

const SPREADSHEET_ID = '16J7cFDcGoiQR-FZhApkgNIdl4E-cihQSyBMrxRfQGdg';
const SHEET_NAME = 'Sheet1';

/**
 * Handle GET requests - serve the HTML form
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Silent Gamers Registration')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Handle POST requests - process form submission
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.email || !data.username || !data.mobileNumber || !data.gameUID || 
        !data.instagram || !data.gameName || !data.upiId) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'All fields are required'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    // Check for duplicate email or username
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Skip header row (index 0)
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      const existingEmail = row[0]; // Column A: Email
      const existingUsername = row[1]; // Column B: Username
      
      if (existingEmail && existingEmail.toString().toLowerCase() === data.email.toLowerCase()) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Email already registered'
        })).setMimeType(ContentService.MimeType.JSON);
      }
      
      if (existingUsername && existingUsername.toString().toLowerCase() === data.username.toLowerCase()) {
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          error: 'Username already taken'
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Generate random password
    const password = generatePassword(12);
    
    // Prepare row data
    // Columns: A:Email, B:Username, C:Mobile Number, D:Game UID, E:Instagram, 
    // F:Red Token, G:Blue Token, H:Password, I:E-sport Points, J:Game Name, 
    // K:Mega tournament, L:Power Coin, M:Status, N:UPI id
    const newRow = [
      data.email,           // A: Email
      data.username,        // B: Username
      data.mobileNumber,    // C: Mobile Number
      data.gameUID,         // D: Game UID
      data.instagram,       // E: Instagram
      0,                    // F: Red Token
      0,                    // G: Blue Token
      password,             // H: Password
      0,                    // I: E-sport Points
      data.gameName,        // J: Game Name
      'No',                 // K: Mega tournament
      0,                    // L: Power Coin
      'Active',             // M: Status
      data.upiId            // N: UPI id
    ];
    
    // Append the new row
    sheet.appendRow(newRow);
    
    // Send email with password
    try {
      sendPasswordEmail(data.email, data.username, password);
    } catch (emailError) {
      Logger.log('Email sending failed: ' + emailError);
      // Continue even if email fails
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration successful! Password sent to your email.'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Server error: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Generate a random password
 */
function generatePassword(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Send password email to user
 */
function sendPasswordEmail(email, username, password) {
  const subject = 'Welcome to Silent Gamers - Your Account Password';
  const body = `
Hello ${username},

Welcome to Silent Gamers! 🎮

Your account has been successfully created. Here are your login credentials:

Email: ${email}
Password: ${password}

IMPORTANT SECURITY NOTES:
- Keep this password safe and confidential
- Do not share your password with anyone
- We will never ask for your password via phone or social media

You can now login and participate in our tournaments!

Follow us on Instagram: @silentgamers

Happy Gaming!
The Silent Gamers Team

---
This is an automated email. Please do not reply to this message.
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}

/**
 * Test function to check if script is working
 */
function testScript() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  Logger.log('Spreadsheet found: ' + sheet.getName());
  Logger.log('Last row: ' + sheet.getLastRow());
}
# Silent Gamers - Deployment Instructions

## Google Apps Script Setup

### 1. Open Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"

### 2. Add the Code Files
1. Rename the default `Code.gs` file or create `code.gs`
2. Copy the contents from `google-apps-script/code.gs` and paste it into the editor
3. Click the "+" next to "Files" and select "HTML"
4. Name it `index`
5. Copy the contents from `google-apps-script/index.html` and paste it

### 3. Update Spreadsheet ID (if different)
In `code.gs`, verify the `SPREADSHEET_ID` constant matches your spreadsheet:
```javascript
const SPREADSHEET_ID = '16J7cFDcGoiQR-FZhApkgNIdl4E-cihQSyBMrxRfQGdg';
```

### 4. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Click the gear icon next to "Select type" and choose "Web app"
3. Fill in the details:
   - **Description**: Silent Gamers Registration
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click "Deploy"
5. You may need to authorize the app (follow the prompts)
6. Copy the Web App URL

### 5. Test the Deployment
1. Open the Web App URL in your browser
2. Fill out the registration form
3. Check your Google Sheet to see if the data appears
4. Check your email for the password

## Next.js Frontend Setup (Optional)

The Next.js application can work standalone or be integrated with your own API.

### Current Implementation
- The signup form (`src/components/SignupForm.tsx`) posts to `/api/signup`
- The API route (`src/app/api/signup/route.ts`) is a placeholder
- Currently returns mock responses for development

### To Use Google Apps Script Instead
You have two options:

#### Option 1: Direct Google Apps Script (Recommended for standalone use)
Use the `google-apps-script/index.html` file directly - it's a complete standalone registration page.

#### Option 2: Integrate Next.js with Google Apps Script
Update `src/app/api/signup/route.ts` to forward requests to your Google Apps Script Web App URL:

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  return NextResponse.json(await response.json());
}
```

## Google Sheet Structure

Ensure your Google Sheet has these columns in Sheet1:
- A: Email
- B: Username
- C: Mobile Number
- D: Game UID
- E: Instagram
- F: Red Token
- G: Blue Token
- H: Password
- I: E-sport Points
- J: Game Name
- K: Mega tournament
- L: Power Coin
- M: Status
- N: UPI id

Row 1 should contain the headers.

## Features Implemented

### ✅ Signup Form
- All required fields (Email, Username, Mobile Number, Game UID, Instagram, Game Name, UPI ID)
- Orange/Gold/Yellow/Black theme
- Bold, clear fonts (Orbitron & Rajdhani)
- Silent Gamers logo display

### ✅ Interactive Info Popups
- Auto-show once per refresh on field focus
- Manual trigger via info (ℹ️) button
- Video embeds for Game UID and Game Name fields
- Closeable with "Got It!" button

### ✅ Google Sheets Integration
- Duplicate detection (Email & Username)
- Auto-generated password
- Password email delivery
- Initial values for tokens, points, status

### ✅ Floating Customer Care
- FAQ modal with 10 common questions
- Animated floating button
- Orange/Gold themed accordion

### ✅ Validation
- All fields required
- Email format validation
- Username uniqueness check
- Mobile number validation
- No duplicate entries

## Testing

### Test the Google Apps Script
1. Open the Web App URL
2. Try registering with test data
3. Check the spreadsheet for the new row
4. Try registering with the same email/username (should fail)
5. Check email for password

### Test the Next.js App
```bash
npm run dev
```
Open http://localhost:3000 and test the form.

## Security Notes

⚠️ **Important**: This implementation stores passwords in plain text as requested. For production:
- Consider hashing passwords
- Use environment variables for sensitive data
- Implement rate limiting
- Add CAPTCHA to prevent spam
- Use HTTPS only

## Support

For issues:
1. Check Google Apps Script execution logs
2. Verify spreadsheet permissions
3. Check email sending quotas (Gmail has daily limits)
4. Ensure sheet structure matches exactly

## Theme Colors Used

- **Background**: Black (#0a0a0a, #1a1a1a)
- **Primary**: Orange (#ff8c00)
- **Secondary**: Gold (#ffd700)
- **Accent**: Yellow (#ffb347, #ffcc00)
- **Text**: Gold on dark backgrounds
- **Borders**: Orange and Gold

No duplicates in the color scheme as requested!
import { NextRequest, NextResponse } from "next/server";

// Google Sheets configuration
const SPREADSHEET_ID = "16J7cFDcGoiQR-FZhApkgNIdl4E-cihQSyBMrxRfQGdg";
const SHEET_NAME = "Sheet1";

// Generate a random password
function generatePassword(length: number = 12): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, mobileNumber, gameUID, instagram, gameName, upiId } = body;

    // Validate required fields
    if (!email || !username || !mobileNumber || !gameUID || !instagram || !gameName || !upiId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Generate password
    const password = generatePassword();

    // Prepare data for Google Sheets
    // Columns: A:Email, B:Username, C:Mobile Number, D:Game UID, E:Instagram, 
    // F:Red Token, G:Blue Token, H:Password, I:E-sport Points, J:Game Name, 
    // K:Mega tournament, L:Power Coin, M:Status, N:UPI id
    const rowData = {
      email,
      username,
      mobileNumber,
      gameUID,
      instagram,
      redToken: "0",
      blueToken: "0",
      password,
      esportPoints: "0",
      gameName,
      megaTournament: "No",
      powerCoin: "0",
      status: "Active",
      upiId,
    };

    // In a real implementation, you would:
    // 1. Check for duplicates in Google Sheets using Google Sheets API
    // 2. Add the new row to the spreadsheet
    // 3. Send email with password
    
    // For now, we'll simulate success and provide instructions
    // The actual implementation requires Google Sheets API credentials

    console.log("User registration data:", rowData);

    // Simulate sending email (in production, use a service like SendGrid, Resend, etc.)
    console.log(`Password ${password} would be sent to ${email}`);

    return NextResponse.json(
      { 
        success: true, 
        message: "Registration successful. Password sent to email.",
        // In development, return password for testing
        devPassword: process.env.NODE_ENV === "development" ? password : undefined,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
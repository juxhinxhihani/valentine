import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { message } = await request.json(); // Optionally pass a message

    const user = process.env.GMAIL_EMAIL;
    const pass = process.env.GMAIL_PASSWORD;

    if (!user || !pass) {
      console.error('Missing GMAIL_EMAIL or GMAIL_PASSWORD environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user,
        pass,
      },
      // Force IPv4 just in case
      family: 4,
    } as any);

    const subject = message?.includes('NO') ? 'SHE SAID NO... 😢' : 'SHE SAID YES! 💖💍';

    const isNo = message?.includes('No') || message?.includes('NO');
    const title = isNo ? 'Status Update: Not Yet... 💔' : 'SHE SAID YES! 💖💍';
    const bodyText = message || 'Congratulations! Your Valentine accepted your proposal!';

    // Style variables
    const bgColor = isNo ? '#f8f9fa' : '#fff0f5';
    const titleColor = isNo ? '#64748b' : '#e11d48';
    const accentColor = isNo ? '#94a3b8' : '#fda4af';

    const mailOptions = {
      from: user,
      to: process.env.RECIPIENT_EMAIL || 'juxhinxhihani@gmail.com',
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: ${bgColor};">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
              <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 64px; line-height: 1;">${isNo ? '😢' : '💑'}</span>
              </div>
              
              <h1 style="color: ${titleColor}; margin: 0 0 20px; font-size: 28px; font-weight: 800; text-align: center; letter-spacing: -0.5px;">
                ${title}
              </h1>
              
              <div style="background-color: ${isNo ? '#f1f5f9' : '#fff1f2'}; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid ${accentColor};">
                <p style="margin: 0; font-size: 18px; line-height: 1.6; color: #334155; text-align: center;">
                  ${bodyText}
                </p>
              </div>

              <div style="text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                  ${isNo ? 'Don\'t lose hope! Persistence is key. 💪' : 'Time to pop the champagne! 🥂'}
                </p>
                 <p style="margin: 10px 0 0; font-size: 12px; color: #cbd5e1;">
                  Sent from your Valentine App
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

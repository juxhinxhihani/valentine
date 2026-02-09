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
    const gradientStart = isNo ? '#94a3b8' : '#fda4af';
    const gradientEnd = isNo ? '#64748b' : '#e11d48';

    const mailOptions = {
      from: user,
      to: process.env.RECIPIENT_EMAIL || 'juxhinxhihani@gmail.com',
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: ${bgColor};">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Gradient Header -->
                  <div style="background: linear-gradient(135deg, ${gradientStart}, ${gradientEnd}); padding: 40px 20px; text-align: center;">
                    <div style="font-size: 72px; line-height: 1; margin-bottom: 10px; text-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      ${isNo ? '😢' : '💑'}
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      ${title}
                    </h1>
                  </div>

                  <!-- Content Body -->
                  <div style="padding: 40px 30px;">
                    <div style="background-color: ${isNo ? '#f8fafc' : '#fff1f2'}; border-radius: 16px; padding: 30px; margin-bottom: 30px; border-left: 6px solid ${gradientEnd};">
                      <p style="margin: 0; font-size: 20px; line-height: 1.6; color: #334155; font-weight: 500;">
                        ${bodyText}
                      </p>
                    </div>

                    <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 30px;">
                      <p style="margin: 0 0 8px; font-size: 16px; color: ${isNo ? '#64748b' : '#be185d'}; font-weight: 600;">
                        ${isNo ? 'Keep your chin up! 💪' : 'Time to celebrate! 🥂'}
                      </p>
                      <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                        Sent from your Valentine App
                      </p>
                    </div>
                  </div>
                  
                </div>
              </td>
            </tr>
          </table>
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

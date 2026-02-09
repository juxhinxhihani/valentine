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

    const title = message?.includes('NO') ? 'Oh no... 😢' : 'She Said YES! 💖';
    const bodyText = message || 'Congratulations! Your Valentine accepted your proposal!';

    const mailOptions = {
      from: user,
      to: 'juxhinxhihani@gmail.com',
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #fff0f5;">
          <h1 style="color: #e11d48;">${title}</h1>
          <p style="font-size: 18px; color: #333;">
            ${bodyText}
          </p>
          <p style="font-size: 16px; color: #666;">
            ${message?.includes('NO') ? 'Don\'t give up!' : 'Time to celebrate! 🥂'}
          </p>
          <div style="margin-top: 30px;">
            <span style="font-size: 40px;">${message?.includes('NO') ? '💔' : '💑'}</span>
          </div>
        </div>
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

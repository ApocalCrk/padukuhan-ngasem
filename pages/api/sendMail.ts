import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: name + ' <' + email + '>',
      to: process.env.EMAIL_TARGET,
      subject: subject,
      text: `Nama: ${name}\nEmail: ${email}\nNomor Telepon: ${phone}\n\nPesan: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Pesan berhasil terkirim' });
    } catch (error:any) {
      res.status(500).json({ error: 'Gagal mengirim email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

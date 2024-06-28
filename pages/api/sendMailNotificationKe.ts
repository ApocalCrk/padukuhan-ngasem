import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import useNotification from '@/hooks/private/useNotification';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { getAllEmail } = useNotification();
    const emailData = await getAllEmail();
    
  if (req.method === 'POST') {
    const { id, title, deskripsi } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.map(data => data.email).join(','),
      subject: title,
      text: `Kegiatan: ${title}\nDeskripsi: ${deskripsi}\n\nLink: ${process.env.BASE_URL}/kegiatan/${id}`,
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

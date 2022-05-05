import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '172672a7dfb845',
    pass: 'c9ae0c1993caad',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <feedget@dev.com>',
      to: 'Angelo Fernandes <afbo2003@gmail.com>',
      subject,
      html: body,
    });
  }
}

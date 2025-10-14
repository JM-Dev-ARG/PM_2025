import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { transporter } from '@/utils/mailer';

export const server = {
  sendMail: defineAction({
    input: z.object({
      nombre: z.string(),
      email: z.string().email(),
      telefono: z.string().optional(),
      mensaje: z.string().optional(),
    }),
    async handler(input) {
      const mailOptions = {
        from: import.meta.env.TEST_NODEMAILER_USER,
        to: import.meta.env.TEST_NODEMAILER_USER,
        subject: 'Nuevo contacto desde pagina web',
        text: `
        Los datos del formulario son:
        Nombre: ${input.nombre}
        Email: ${input.email}
        Telefono: ${input.telefono}
        Mensaje: ${input.mensaje}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return error;
        } else {
          console.log('Email sent: ' + info.messageId);
          return { success: true };
        }
      });
    },
  }),
};

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

export const server = {
  sendMail: defineAction({
    input: z.object({
      nombre: z.string(),
      email: z.string().email(),
      telefono: z.string().optional(),
      mensaje: z.string().optional(),
    }),
    async handler(input) {
      const mailgun = new Mailgun(formData);
      const client = mailgun.client({
        username: 'api',
        key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
      });

      try {
        const result = await client.messages.create(import.meta.env.MAILGUN_DOMAIN, {
          from: `Contacto Web <noreply@${import.meta.env.MAILGUN_DOMAIN}>`,
          to: `${import.meta.env.MAILGUN_EMAIL_DESTINO}`,
          subject: `Nuevo contacto desde tu pagina web`,
          text: `Los datos del formulario son:
        Nombre: ${input.nombre}
        Email: ${input.email}
        Telefono: ${input.telefono}
        Mensaje: ${input.mensaje}`,
        });

        return { result, success: true };
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        return error;
      }
    },
  }),
};

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { replyToEmail, subject, message } = body

  const response = await resend.emails.send({
    from: 'WEBSITE CONTACT <onboarding@resend.dev>',
    to: ['lauragonzalezcomalada@gmail.com'],
    subject: subject,
    replyTo: replyToEmail,
    html: `<p>${message}</p>`,
    text: message,
  })

  if (response.error) {
    throw createError({
      statusCode: 500,
      message: 'Error sending email',
    })
  }

  return response
})

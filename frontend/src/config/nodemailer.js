import nodemailer from 'nodemailer'

const email = process.env.NEXT_PUBLIC_EMAIL
const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: email,
        pass: password,
        method: 'LOGIN'
    }
})

export const mailOptions = {
    from : email,
    to: email,
}
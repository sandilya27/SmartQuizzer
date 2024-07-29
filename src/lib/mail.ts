// import { Resend } from "resend";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { conformation } from "./templates/confirmation";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.BASE_URL}/auth/new-verification?token=${token}`;

    console.log(confirmLink);

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    })

    try {
        const testResult = await transport.verify();
        console.log(testResult);
    } catch (error) {
        console.log(error);
        return;
    }

    try {
        const sendResult = await transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Please Confirm Your Email Address",
            html: compileConfirmationTemplate(confirmLink),
        })
        console.log(sendResult);
    } catch (error) {
        console.log(error);
    }

    // await resend.emails.send({
    //     from: "onboarding@resend.dev",
    //     to: email,
    //     subject: "Confirm your email",
    //     html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    // })
}

const compileConfirmationTemplate = (url: string) => {
    const template = handlebars.compile(conformation);
    const htmlBody = template({
        url,
    });
    return htmlBody;
}
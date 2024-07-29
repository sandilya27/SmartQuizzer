// import { Resend } from "resend";
import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { conformation } from "./templates/confirmation";
import { reset } from "./templates/reset";
import { twoFactorTemp } from "./templates/2FA";

// const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {

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
            subject: "Your Two-Factor-Authentication Code",
            html: twoFactorTemplate(token),
        })
        console.log(sendResult);
    } catch (error) {
        console.log(error);
    }
}

const twoFactorTemplate = (code: string) => {
    const template = handlebars.compile(twoFactorTemp);
    const htmlBody = template({
        code,
    });
    return htmlBody;
}

export const sendPasswordRestEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.BASE_URL}/auth/new-password?token=${token}`;

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
            subject: "Please Reset your password",
            html: compileResetTemplate(confirmLink),
        })
        console.log(sendResult);
    } catch (error) {
        console.log(error);
    }
}

const compileResetTemplate = (url: string) => {
    const template = handlebars.compile(reset);
    const htmlBody = template({
        url,
    });
    return htmlBody;
}

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
}

const compileConfirmationTemplate = (url: string) => {
    const template = handlebars.compile(conformation);
    const htmlBody = template({
        url,
    });
    return htmlBody;
}
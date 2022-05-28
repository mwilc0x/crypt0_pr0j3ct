import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;

export default class EmailService {
    oauth2Client;

    constructor() {
        this.oauth2Client = new OAuth2(
            process.env.EMAIL_SERVICE_GOOGLE_CLIENT_ID,
            process.env.EMAIL_SERVICE_GOOGLE_CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );
        
        this.oauth2Client.setCredentials({
            refresh_token: process.env.EMAIL_SERVICE_GMAIL_OAUTH_REFRESH_TOKEN
        });
    }

    getAccessToken = async () => {
        return new Promise((resolve, reject) => {
            try {
                this.oauth2Client.getAccessToken((error, token) => {
                    if (error) {
                        console.log('Failed to retrieve access token.', error);
                        reject(false);
                        return;
                    }
                    resolve(token);
                });
            } catch (error) {
                console.log('Error retrieving access token', error);
                reject(false);
                return;
            }
        });
    }

    createTransporter = async (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                // const accessToken = await this.getAccessToken();
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                      type: 'OAuth2',
                      user: process.env.EMAIL_SERVICE_EMAIL_ACCOUNT_USER,
                      clientId: process.env.EMAIL_SERVICE_GOOGLE_CLIENT_ID,
                      clientSecret: process.env.EMAIL_SERVICE_GOOGLE_CLIENT_SECRET,
                      refreshToken: process.env.EMAIL_SERVICE_GMAIL_OAUTH_REFRESH_TOKEN
                    }
                  });

                  resolve(transporter);
                  return;
            } catch (error) {
                console.log('Error creating the email transporter', error);
                reject(false);
                return;
            }
        });
    }

    sendEmail = async (options) => {
        return new Promise(async (resolve, reject) => {
            try {
                let emailTransporter = await this.createTransporter();
                let result = await emailTransporter.sendMail(options);
                resolve(result);
            } catch (error) {
                console.log('Error sending email', error);
                reject(false);
            }
        });
    }
}

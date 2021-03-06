import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import * as Email from 'email-templates';
import { User } from '../user';
import { EmailTemplate } from './email.entity';
import { CrudService } from '../core';

@Injectable()
export class EmailService extends CrudService<EmailTemplate> {
	constructor(
		@InjectRepository(EmailTemplate)
		private readonly emailRepository: Repository<EmailTemplate>
	) {
		super(emailRepository);
	}

	email = new Email({
		message: {
			from: 'Gauzy@Ever.co'
		},
		transport: {
			jsonTransport: true
		},
		i18n: {},
		views: {
			options: {
				extension: 'hbs'
			}
		},
		preview: {
			open: {
				app: 'firefox',
				wait: false
			}
		}
	});

	languageCode: string;

	welcomeUser(user: User) {
		this.languageCode = 'he';

		this.email
			.send({
				template: `../apps/api/src/app/email-templates/views/welcome-user/${this.languageCode}`,
				message: {
					to: `${user.email}`,
					subject: 'Welcome to Gauzy'
				},
				locals: {
					email: user.email
				}
			})
			.then((res) => {
				this.createEmailRecord(res.originalMessage);
			})
			.catch(console.error);
	}

	requestPassword(user: User, url: string) {
		this.languageCode = 'bg';

		this.email
			.send({
				template: `../apps/api/src/app/email-templates/views/password/${this.languageCode}`,
				message: {
					to: `${user.email}`,
					subject: 'Forgotten Password'
				},
				locals: {
					generatedUrl: url
				}
			})
			.then((res) => {
				this.createEmailRecord(res.originalMessage);
			})
			.catch(console.error);
	}

	createEmailRecord(message): Promise<EmailTemplate> {
		console.log(message);

		const email = new EmailTemplate();

		email.name = message.subject;
		email.content = message.html;
		email.languageCode = 'en';

		return this.emailRepository.save(email);
	}

	// tested e-mail send functionality
	async nodemailerSendEmail(user: User, url: string) {
		const testAccount = await nodemailer.createTestAccount();

		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user,
				pass: testAccount.pass
			}
		});

		// Gmail example:

		// const transporter = nodemailer.createTransport({
		// 	service: 'gmail',
		// 	auth: {
		// 		user: 'user@gmail.com',
		// 		pass: 'password'
		// 	}
		// });

		const info = await transporter.sendMail({
			from: 'Gauzy',
			to: user.email,
			subject: 'Forgotten Password',
			text: 'Forgot Password',
			html:
				'Hello! <br><br> We received a password change request.<br><br>If you requested to reset your password<br><br>' +
				'<a href=' +
				url +
				'>Click here</a>'
		});

		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	}
}

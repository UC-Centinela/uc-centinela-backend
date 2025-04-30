// Application Interfaces
import { IEmailService } from '@commons/domain/interfaces/email.interface'
import { ILogger} from '@commons/domain/interfaces/logger.interface'

export default class EmailService implements IEmailService {

  constructor (private logger: ILogger) {}
  
  public async sendEmail (
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    // Here you can use any third-party email service to implement this method.

    this.logger.info(
      `[Infrastructure][Adapters][${this.constructor.name}][sendEmail] Sending email to: ${to}, subject: ${subject}, body: ${body} ...`
    )
    return Promise.resolve()
  }
  
}

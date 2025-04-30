export interface IEmailService {
  /**
   * This method is responsible for sending an emai independent of the third-party email service that you choose to use.
   * @param to - The recipient's email address.
   * @param subject - The subject line of the email.
   * @param body - The body content of the email.
   */
  sendEmail(to: string, subject: string, body: string): Promise<void>
}

import EmailService from './email'

describe('EmailService', () => {
  const mockLogger = { info: jest.fn() }

  it('envía un correo y registra el log', async () => {
    const service = new EmailService(mockLogger as any)
    await service.sendEmail('a@b.com', 'subject', 'body')
    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Sending email to: a@b.com'))
  })
})

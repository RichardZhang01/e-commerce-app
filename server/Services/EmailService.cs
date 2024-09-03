using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace ECommerceBE.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string emailBody);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string emailBody)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("E-Commerce App", _configuration["Smtp:FromEmail"]));
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = emailBody
            };
            email.Body = bodyBuilder.ToMessageBody();

            using var smtp = new SmtpClient();
            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"]);
            var useSSL = bool.Parse(_configuration["Smtp:UseSSL"]);

            SecureSocketOptions secureSocketOptions;
            if (useSSL && smtpPort == 465)
            {
                secureSocketOptions = SecureSocketOptions.SslOnConnect;
            }
            else if (useSSL && smtpPort == 587)
            {
                secureSocketOptions = SecureSocketOptions.StartTls;
            }
            else
            {
                secureSocketOptions = SecureSocketOptions.None;
            }

            await smtp.ConnectAsync(smtpHost, smtpPort, secureSocketOptions);
            await smtp.AuthenticateAsync(_configuration["Smtp:Username"], _configuration["Smtp:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }
    }
}

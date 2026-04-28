type ContactTemplateType = {
  name: string
  email: string
  message: string
}

export const contactTemplate = ({ name, email, message }: ContactTemplateType) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Message</title>
</head>
<body style="margin:0;padding:0;background:#f4f2ee;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
          
          <!-- Header -->
          <tr>
            <td style="background:#1a1a1a;padding:28px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888;font-family:monospace;">New message</p>
              <p style="margin:6px 0 0;font-size:20px;font-weight:500;color:#ffffff;">Auto Loans</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Sender -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #ebebeb;">
                <tr>
                  <td>
                    <p style="margin:0 0 3px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-family:monospace;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#111;">${name}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:#666;">${email}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#888;font-family:monospace;">Message</p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#222;">${message}</p>

              <!-- Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f5;border-radius:8px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="margin:0;font-size:12px;color:#888;line-height:1.6;">This message was sent via your website's contact form. Please reply directly to the sender's email above.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #ebebeb;">
              <p style="margin:0;font-size:12px;color:#aaa;">Auto Loans · Automated notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

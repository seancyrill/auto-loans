export function getEmailHTML(name: string, phone: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Form Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f5; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
 
  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5; padding: 40px 0;">
    <tr>
      <td align="center">
 
        <!-- Card -->
        <table width="560" cellpadding="0" cellspacing="0" border="0"
          style="background-color:#ffffff; border-radius:12px; overflow:hidden;
                 box-shadow: 0 2px 12px rgba(0,0,0,0.08); max-width:560px; width:100%;">
 
          <!-- Top accent bar -->
          <tr>
            <td style="background-color:#1a1a2e; height:5px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
 
          <!-- Header -->
          <tr>
            <td style="padding: 36px 40px 24px 40px;">
              <p style="margin:0 0 6px 0; font-size:11px; font-weight:600; letter-spacing:2px;
                         color:#6b7280; text-transform:uppercase;">Form Notification</p>
              <h1 style="margin:0; font-size:22px; font-weight:700; color:#1a1a2e; line-height:1.3;">
                New Applicant Received
              </h1>
            </td>
          </tr>
 
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border:none; border-top:1px solid #e5e7eb; margin:0;" />
            </td>
          </tr>
 
          <!-- Body text -->
          <tr>
            <td style="padding: 28px 40px 8px 40px;">
              <p style="margin:0; font-size:15px; color:#374151; line-height:1.7;">
                Someone has filled out a form on your application. Here are the details submitted:
              </p>
            </td>
          </tr>
 
          <!-- Details block -->
          <tr>
            <td style="padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f9fafb; border-radius:8px; border:1px solid #e5e7eb;">
 
                <!-- Name row -->
                <tr>
                  <td style="padding: 16px 20px; border-bottom:1px solid #e5e7eb;">
                    <p style="margin:0 0 3px 0; font-size:11px; font-weight:600; letter-spacing:1.5px;
                               color:#9ca3af; text-transform:uppercase;">Full Name</p>
                    <p style="margin:0; font-size:16px; font-weight:600; color:#111827;">${name}</p>
                  </td>
                </tr>
 
                <!-- Phone row -->
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin:0 0 3px 0; font-size:11px; font-weight:600; letter-spacing:1.5px;
                               color:#9ca3af; text-transform:uppercase;">Phone Number</p>
                    <p style="margin:0; font-size:16px; font-weight:600; color:#111827;">${phone}</p>
                  </td>
                </tr>
 
              </table>
            </td>
          </tr>
 
          <!-- Footer note -->
          <tr>
            <td style="padding: 8px 40px 36px 40px;">
              <p style="margin:0; font-size:13px; color:#9ca3af; line-height:1.6;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>
 
          <!-- Bottom bar -->
          <tr>
            <td style="background-color:#f9fafb; padding: 18px 40px; border-top:1px solid #e5e7eb;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                &copy; ${new Date().getFullYear()} AutoLoans. All rights reserved.
              </p>
            </td>
          </tr>
 
        </table>
        <!-- End card -->
 
      </td>
    </tr>
  </table>
 
</body>
</html>
  `
}

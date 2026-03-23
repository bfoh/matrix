const { Resend } = require('resend');
const resend = new Resend('re_NmNYWMGd_BmbSLMrig4e1psFZS29zTUaZ');

async function test() {
  try {
    const data = await resend.emails.send({
      from: 'Matrix Property Bookings <info@bookings.matrixmultitech.net>',
      to: 'ebenezerbarning@yahoo.com',
      subject: 'Test Verification Email',
      html: '<p>This is a test from the newly verified domain.</p>'
    });
    console.log("Success:", JSON.stringify(data));
  } catch (err) {
    console.log("Error:", err.message);
  }
}
test();

export const sendEmail = async (to: string, subject: string, body: string) => {
  // Email sending logic
  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  await sendEmail(email, 'Welcome to Life Compass', `Hello ${name}!`);
};

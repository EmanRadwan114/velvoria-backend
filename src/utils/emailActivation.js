import sendEmail from "../utils/sendEmail.js";
import generateToken from "./generateToken.js";

//* Helper function for generating and sending activation email
const generateAndSendActivationEmail = async (user) => {
  try {
    //* Generate activation token with a 15-minute expiration
    const token = generateToken(
      { id: user._id },
      process.env.EMAIL_ACTIVATION_TOKEN_SECRET_KEY
    );

    //* Construct activation and refresh token links
    const activationLink = `${process.env.BASE_URL}/auth/email-activation/${token}`;

    //* Log the generated links for debugging
    console.log("Activation Link:", activationLink);

    //* Send email with the links
    await sendEmail(user.email, activationLink);
  } catch (err) {
    console.error("Error sending activation email:", err);
    throw new Error("Failed to send activation email");
  }
};

export default generateAndSendActivationEmail;

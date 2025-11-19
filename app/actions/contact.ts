"use server";

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return {
      success: false,
      error: "Fornavn, email og beskrivelse er påkrævet",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Ugyldig email adresse",
    };
  }

  if (!resend || !resendApiKey) {
    console.error("RESEND_API_KEY is not configured");
    return {
      success: false,
      error: "Email service er ikke konfigureret. Kontakt venligst support.",
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Kontaktformular <onboarding@resend.dev>", // TODO Ændre til noreply@mgdk.dk når domænet går live
      to: "frg@mgdk.dk", // TODO Ændre til mgdk mail når domænet går live
      replyTo: email,
      subject: `Ny kontaktformular fra ${name}`,
      html: `
        <h2>Ny kontaktformular</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
        <p><strong>Beskrivelse:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
Ny kontaktformular

Navn: ${name}
Email: ${email}
${phone ? `Telefon: ${phone}` : ""}

Beskrivelse:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Der opstod en fejl ved afsendelse. Prøv venligst igen senere.",
      };
    }

    return {
      success: true,
      message: "Tak for din besked! Vi vender tilbage snarest.",
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: "Der opstod en fejl ved afsendelse. Prøv venligst igen senere.",
    };
  }
}

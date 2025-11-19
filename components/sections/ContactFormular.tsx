"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { sendContactEmail } from "@/app/actions/contact";

export default function ContactFormular(props: { title?: string }) {
  const { title } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message:
            result.message || "Tak for din besked! Vi vender tilbage snarest.",
        });
        if (form) {
          form.reset();
        }
      } else {
        setStatus({
          type: "error",
          message: result.error || "Der opstod en fejl. Prøv venligst igen.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Der opstod en uventet fejl. Prøv venligst igen.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="w-full max-w-[1440px] 2xl:max-w-[1640px] px-4 lg:px-8 mx-auto flex flex-col items-center py-15 mb-10">
        <h2 className="text-[36px] md:text-[52px] text-center font-medium mb-15 md:mb-10">
          {title}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="border-2 border-gray-200 rounded-lg p-6 max-w-[400px] w-full flex flex-col gap-4"
        >
          <Input
            name="name"
            placeholder="Fornavn"
            disabled={isSubmitting}
            aria-label="Fornavn"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            disabled={isSubmitting}
            aria-label="Email"
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Telefon"
            disabled={isSubmitting}
            aria-label="Telefon"
          />
          <Textarea
            name="message"
            placeholder="Beskrivelse"
            disabled={isSubmitting}
            rows={5}
            aria-label="Beskrivelse"
          />

          <div className="min-h-[40px] flex items-center">
            {status.type && (
              <div
                className={`px-3 py-2 rounded-md text-sm w-full ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
                role="alert"
              >
                {status.message}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sender..." : "Send"}
          </Button>
        </form>
      </div>
      <Separator className="bg-black/10" />
    </div>
  );
}

"use client";

import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      setSubmitMessage("Server error. Please try again later.");
    }
    setIsSubmitting(false);

    setTimeout(() => setSubmitMessage(""), 3000);
  };

  return (
    <div className="m-4 bg-[#1f2735] p-6 rounded shadow-lg border mb-6">
      <h1 className="text-3xl font-bold text-blue-400 mb-2 text-center">
        Contact Us
      </h1>
      <br />
      <h3 className="mb-4 text-white font-semibold ">
        We'd love to hear from you. Send us a message and we'll respond as soon
        as possible.
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white mb-1"
          >
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 pr-6 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] bg-[#1e293b] text-white"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-1"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] bg-[#1e293b] text-white"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-[#d1d5db] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] bg-[#1e293b] text-white"
            placeholder="Your feedback..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: "12px" }}
          className="w-10 flex justify-center bg-blue-600 hover:bg-blue-800 text-white px-20 py-1 rounded-2 items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          {isSubmitting ? "Sending..." : "Send Feedback"}
        </button>
        {submitMessage && (
          <span className="text-green-600 text-md">{submitMessage}</span>
        )}
      </form>
      <br />
      <hr />
      <br />
      <div className="mt-6 pt-4 border-t border-[#e5e7eb] text-center text-sm text-[#6b7280]">
        <h2 className="mb-2 text-white font-semibold text-lg">Contact Us Via:</h2>
        <p className="mb-2 text-white">
          Email:{" "}
          <a
            href="mailto:pandyachirag661@gmail.com"
            className="text-blue-400 hover:underline"
          >
            studymate505@gmail.com
          </a>
        </p>

        <p className="mb-2 text-white">Phone No: +91 (111) 9999-9999</p>
      </div>
    </div>
  );
}

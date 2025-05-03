import { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_vl8aqnk", //  EmailJS Service ID
        "template_vev1yt4", //Template ID
        formData,
        "WcJTiybLjPwfKn76B" //  Public Key
      )
      .then(
        () => {
          setSuccessMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error("Failed to send message:", error);
          setSuccessMessage("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div className="max-w-5xl mx-auto mb-10">
      <h2 className="text-center text-xl md:text-3xl font-bold text-gray-700 mb-10">
        If You Got Any Questions, <br /> Please Do Not Hesitate to Send Us a
        Message.
      </h2>

      {successMessage && (
        <p className="text-center text-green-500 font-semibold mb-4">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 p-3 mb-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-100 mb-4"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-100 mb-4"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 bg-gray-100 h-28 md:h-48 mb-4"
        ></textarea>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="px-2 md:px-6 bg-red-500 text-white py-2 md:py-4 hover:bg-red-700"
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

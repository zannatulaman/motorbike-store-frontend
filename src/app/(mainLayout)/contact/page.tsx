/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useRef } from "react";
import emailjs from "emailjs-com";


const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      alert("Form reference is not available.");
      return;
    }

    emailjs
      .sendForm(
        "service_amyh1sj", // 🔁 Your Service ID
        "template_xb6y2dr", // 🔁 Your Template ID
        form.current,
        "aprI6RjCwjQMh_MPb" // 🔁 Your EmailJS Public Key
      )
      .then(
        () => {
          alert("Message sent successfully!");
        },
        (error: any) => {
          alert("Failed to send message. Please try again.");
          console.error(error);
        }
      );

    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="bg-gradient-to-b from-gray-300 via-gray-900 to-gray-700 py-12 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-red-500">Get in Touch</h2>
        <p className="mt-2 text-white">We are here for you!</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
        {/* Left Side - Form */}
        <div className="w-full lg:w-2/3 p-8 bg-black text-white">
          <h3 className="text-2xl font-semibold text-red-500 mb-6">
            Drop a Message
          </h3>
          <form ref={form} onSubmit={sendEmail}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  required
                  className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  required
                  className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
              </div>
              <div>
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter the subject"
                  required
                  className="w-full mt-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
                />
              </div>
              <div className="md:col-span-2">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  required
                  className="w-full mt-1 p-2 h-28 rounded bg-gray-800 text-white border border-gray-600 resize-none"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="w-full lg:w-1/3 bg-gradient-to-br from-red-600 to-black text-white p-8">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 text-white" />
              <p>Our Business address is 1063 Freelon Street, San Francisco</p>
            </div>
            <div className="flex items-center gap-3">
              <Phone />
              <p>+1 (718) 123-4567</p>
            </div>
            <div className="flex items-center gap-3">
              <Mail />
              <p>samplemail@sample.com</p>
            </div>
            <div className="flex items-center gap-3">
              <Globe />
              <p>www.website.com</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Facebook className="hover:text-red-400" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-red-400" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="hover:text-red-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;

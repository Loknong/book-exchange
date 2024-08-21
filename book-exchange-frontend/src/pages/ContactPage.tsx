import React from "react";

const ContactUsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6 text-secondary-muted">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          We'd Love to Hear From You!
        </h2>
        <p className="text-lg leading-relaxed">
          Have questions, feedback, or just want to say hello? Feel free to
          reach out to us. We’re here to help and always eager to hear from our
          community of book lovers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:support@turnix.com"
              className="text-blue-500 hover:underline"
            >
              support@turnix.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+1234567890" className="text-blue-500 hover:underline">
              +1 (234) 567-890
            </a>
          </p>
          <p>
            <strong>Address:</strong> 123 Book Exchange Ave, Library City, 56789
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your Message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <div className="space-x-4">
          <a
            href="https://twitter.com/turnix"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com/turnix"
            className="text-blue-500 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com/turnix"
            className="text-blue-500 hover:underline"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;

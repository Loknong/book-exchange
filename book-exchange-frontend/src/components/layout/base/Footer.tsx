import Logo from "../../../assets/logo.svg";

function Footer() {
  return (
    <footer className="bg-secondary py-12 mt-16 flex-grow">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            About TURNiX
          </h3>
          <p className="text-gray-400">
            TURNiX is your go-to platform for exchanging books with ease. Join
            our community of book lovers and start trading your books today!
          </p>
          <div className="mt-4">
            <img src={Logo} alt="TURNiX Logo" className="w-32" />
          </div>
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="index.html" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="my-books.html" className="hover:text-white transition">
                My Books
              </a>
            </li>
            <li>
              <a href="exchange.html" className="hover:text-white transition">
                Exchange
              </a>
            </li>
            <li>
              <a href="about.html" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="contact.html" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">
            Customer Service
          </h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="faqs.html" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="shipping.html" className="hover:text-white transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="privacy.html" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="terms.html" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-400">
        &copy; 2024 TURNiX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

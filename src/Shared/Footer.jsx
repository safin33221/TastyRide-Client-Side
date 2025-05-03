import React from "react";
import toast from "react-hot-toast";
import { FaFacebookF, FaInstagram,  FaYoutube } from "react-icons/fa"; // Using react-icons for social media icons
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  // Handle newsletter subscription (placeholder function)
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success(`Thank you for subscribing with ${email}!`);
      e.target.reset();
    }
  };

  return (
    <footer className="bg-black text-white pb-8 pt-20">
      <div className="container mx-auto px-4 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold text-red-500 mb-4">TastyRide</h3>
            <p className="text-gray-300 text-sm">
              TastyRide is your go-to food delivery service, bringing delicious meals from your favorite restaurants right to your doorstep. Order, track, and enjoy with ease!
            </p>
          </div>

          {/* Quick Links */}
          <div className="pl-12">
            <h4 className="text-lg  font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/all-food" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                  All Food
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-pink-500 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-300 text-sm mb-2">
              Email: <a href="mailto:support@tastyride.com" className="hover:text-pink-500 transition-colors duration-300">support@tastyride.com</a>
            </p>
            <p className="text-gray-300 text-sm mb-2">
              Phone: <a href="tel:+1234567890" className="hover:text-pink-500 transition-colors duration-300">+1 (234) 567-890</a>
            </p>
            <p className="text-gray-300 text-sm">
              Address: 123 Flavor Street, Foodie City, FC 12345
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-gray-300 text-sm mb-4">
              Stay updated with the latest offers and updates from TastyRide!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row  gap-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                style={{ backgroundColor: "#2d3748", border: "1px solid #4a5568" }}
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" text-red-500 hover:text-red-700 transition-colors duration-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" text-red-500 hover:text-red-700 transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" text-red-500 hover:text-red-700 transition-colors duration-300">
            <FaXTwitter size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className=" text-red-500 hover:text-red-700 transition-colors duration-300">
            <FaYoutube size={24} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            &copy; 2025 TastyRide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
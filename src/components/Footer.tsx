import {
  Facebook,
  HousePlus,
  Instagram,
  Linkedin,
  MailPlus,
  PhoneCall,
  Twitter,
} from "lucide-react";
import Link from "next/link";


const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title text-red-500 text-lg font-bold">
          Quick Links
        </h6>
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About Us</Link>
        <Link href={"/service"}>Services</Link>
        <Link href={"/product"}>Products</Link>
        <Link href={"/contact"}>Contact Us</Link>
      </nav>
      <nav>
        <h6 className="footer-title text-red-500 text-lg font-bold">
          Contact Us
        </h6>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <HousePlus className="text-green-500 mt-1" />
            <span>87-50, 167th Street, Jamaica, NY 11432</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall className="text-green-500" />
            <span>+1 (718) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MailPlus className="text-green-500" />
            <span>sample123@gmail.com</span>
          </div>
        </div>
      </nav>
      <nav>
        <h6 className="footer-title text-red-500 text-lg font-bold mb-2">
          Connect With Us
        </h6>
        <div className="flex gap-4 text-green-500">
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 transition"
          >
            <Facebook />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 transition"
          >
            <Instagram />
          </Link>
          <Link
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 transition"
          >
            <Twitter />
          </Link>
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-700 transition"
          >
            <Linkedin />
          </Link>
        </div>
      </nav>
      <nav>
        <h6 className="footer-title text-red-500 text-lg font-bold">
          Newsletter Signup
        </h6>
        <p className="text-sm mb-4">
          Subscribe to get updates on our latest products and offers.
        </p>
        <form className="w-full max-w-sm space-y-3">
          <label htmlFor="newsletter" className="block text-sm font-semibold">
            Enter your email
          </label>
          <div className="join w-full">
            <input
              id="newsletter"
              type="email"
              placeholder="your@email.com"
              className="input input-bordered join-item w-full text-black"
              required
            />
            <button type="submit" className="join-item btn btn-primary">
              Subscribe
            </button>
          </div>
        </form>
      </nav>
    </footer>
  );
};

export default Footer;

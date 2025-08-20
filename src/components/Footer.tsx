import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold">Ifixit</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Digital solutions agency crafting exceptional digital experiences through innovative design and development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent smooth-transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent smooth-transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent smooth-transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/services" className="block text-primary-foreground/80 hover:text-accent smooth-transition text-sm">
                Our Services
              </Link>
              <Link to="/portfolio" className="block text-primary-foreground/80 hover:text-accent smooth-transition text-sm">
                Portfolio
              </Link>
              <Link to="/reviews" className="block text-primary-foreground/80 hover:text-accent smooth-transition text-sm">
                Reviews
              </Link>
              <Link to="/contact" className="block text-primary-foreground/80 hover:text-accent smooth-transition text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-accent" />
                <span className="text-primary-foreground/80 text-sm">+254 723 408 902</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-accent" />
                <span className="text-primary-foreground/80 text-sm">hello@ifixit.digital</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent" />
                <span className="text-primary-foreground/80 text-sm">Nairobi, NBO</span>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Inquiry</h3>
            <form className="space-y-3">
              <Input 
                placeholder="Your email" 
                type="email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Textarea 
                placeholder="Your message" 
                rows={3}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="hero" size="sm" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Ifixit Digital Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
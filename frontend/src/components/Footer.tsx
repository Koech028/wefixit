import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">I</span>
                            </div>
                            <span className="text-xl font-bold">Ifixit</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Digital solutions agency crafting exceptional digital experiences through innovative design and development.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                                <MessageCircle size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <div className="space-y-2">
                            <Link to="/services" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                                Our Services
                            </Link>
                            <Link to="/portfolio" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                                Portfolio
                            </Link>
                            <Link to="/reviews" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                                Reviews
                            </Link>
                            <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm">
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone size={16} className="text-blue-400" />
                                <span className="text-gray-300 text-sm">+254 723 408 902</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail size={16} className="text-blue-400" />
                                <span className="text-gray-300 text-sm">hello@ifixit.digital</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin size={16} className="text-blue-400" />
                                <span className="text-gray-300 text-sm">Nairobi, NBO</span>
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
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Textarea
                                placeholder="Your message"
                                rows={3}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 py-2">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Ifixit Digital Solutions. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

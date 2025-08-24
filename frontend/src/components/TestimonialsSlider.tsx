import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const testimonials = [
        {
            name: 'Sarah Johnson',
            company: 'TechStart Inc.',
            position: 'CEO',
            content: 'Ifixit transformed our digital presence completely. Their attention to detail and creative approach exceeded our expectations. Our website traffic increased by 300% within the first month.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
        },
        {
            name: 'Michael Chen',
            company: 'Digital Solutions Ltd.',
            position: 'Marketing Director',
            content: 'Working with Ifixit was a game-changer for our business. They delivered a stunning website that perfectly captures our brand essence. The team is professional, responsive, and highly skilled.',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
            name: 'Emily Rodriguez',
            company: 'Creative Agency Pro',
            position: 'Founder',
            content: 'The UI/UX design services provided by Ifixit are exceptional. They created an intuitive and beautiful interface for our mobile app that our users absolutely love. Highly recommended!',
            rating: 5,
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20" style={{ backgroundColor: '#0f1b89' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        What Our <span className="text-green-400">Clients Say</span>
                    </h2>
                    <p className="text-lg text-blue-200 leading-relaxed">
                        Don't just take our word for it. Here's what our satisfied clients have to say about our work.
                    </p>
                </div>

                {/* Testimonial Slider */}
                <div className="relative max-w-4xl mx-auto">
                    <Card className="bg-blue-900/30 backdrop-blur-sm border border-blue-400/20 rounded-xl overflow-hidden">
                        <CardContent className="p-8 md:p-12">
                            <div className="text-center">
                                {/* Quote Icon */}
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-400/10 rounded-full flex items-center justify-center border border-green-400/20">
                                    <Quote className="w-8 h-8 text-green-400" />
                                </div>

                                {/* Stars - Trustpilot Style */}
                                <div className="flex justify-center mb-6">
                                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 fill-green-400 text-green-400" />
                                    ))}
                                </div>

                                {/* Testimonial Content */}
                                <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8 font-light">
                                    "{testimonials[currentSlide].content}"
                                </blockquote>

                                {/* Client Info */}
                                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                    <img
                                        src={testimonials[currentSlide].avatar}
                                        alt={testimonials[currentSlide].name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-green-400/30"
                                    />
                                    <div className="text-center sm:text-left">
                                        <div className="font-semibold text-white text-lg">
                                            {testimonials[currentSlide].name}
                                        </div>
                                        <div className="text-blue-200">
                                            {testimonials[currentSlide].position} at {testimonials[currentSlide].company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation Buttons */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 rounded-full w-12 h-12 p-0 bg-blue-800/70 backdrop-blur-sm border-blue-400/30 text-white hover:bg-blue-700/70"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 rounded-full w-12 h-12 p-0 bg-blue-800/70 backdrop-blur-sm border-blue-400/30 text-white hover:bg-blue-700/70"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-green-400' : 'bg-blue-500/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust Indicator */}
                <div className="text-center mt-12">
                    <div className="inline-flex items-center bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
                        <div className="flex mr-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-green-300">Rated Excellent by Our Clients</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSlider;
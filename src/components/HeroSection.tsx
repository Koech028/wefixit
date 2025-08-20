import { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';

const HeroSection = () => {
    const [showVideo, setShowVideo] = useState(false);

    const handleStartProject = () => {
        // Example: scroll to a contact form
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Digital Solutions Hero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 hero-gradient opacity-90"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 py-2">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                        <span className="text-accent-foreground text-sm font-medium">Digital Solutions Agency</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                        Crafting Digital
                        <span className="block gradient-text">Experiences</span>
                        That Matter
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
                        We transform your ideas into stunning digital solutions through innovative design,
                        cutting-edge development, and strategic thinking.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Button
                            variant="cta"
                            size="lg"
                            className="group"
                            onClick={handleStartProject}
                        >
                            Start Your Project
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 smooth-transition" />
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20"
                            onClick={() => setShowVideo(true)}
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Watch Our Work
                        </Button>
                    </div>

                    {/* Optional: Modal for video */}
                    {showVideo && (
                        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
                            <div className="relative w-full max-w-2xl aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    title="Watch Our Work"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                                <button
                                    onClick={() => setShowVideo(false)}
                                    className="absolute top-2 right-2 text-white text-2xl"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16">
                        {/* ... stats content remains unchanged ... */}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

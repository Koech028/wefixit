import { useEffect, useState } from 'react';
import api from '../api';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Project = {
    title: string;
    image: string;
    link: string;
};

const Portfolio = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        api
            .get('/projects/')
            .then((res) => setProjects(res.data))
            .catch((err) => console.error('Failed to fetch projects:', err));
    }, []);

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 hero-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
                        Our <span className="gradient-text">Portfolio</span>
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
                        Explore our latest work and see how we've helped businesses across various industries
                        achieve their digital goals through innovative design and development.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {projects.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No projects found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {projects.map((project, index) => (
                                <Card
                                    key={index}
                                    className="hover:shadow-lg transition-all border border-border/40 rounded-xl overflow-hidden"
                                >
                                    <div className="relative">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => window.open(project.link, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="text-lg font-semibold text-center text-foreground">
                                            {project.title}
                                        </h3>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-secondary/30">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Like What You See?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Ready to create something amazing together? Let's discuss your project and bring your vision to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="cta" size="lg">
                            Start Your Project
                        </Button>
                        <Button variant="outline" size="lg">
                            View Case Studies
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Portfolio;

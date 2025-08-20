import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Code2,
    Palette,
    Smartphone,
    Globe,
    Zap,
    Shield,
    Database,
    Rocket
} from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: Code2,
            title: "Web Development",
            description: "Custom web applications built with modern frameworks and technologies.",
            features: ["React & Next.js", "Node.js Backend", "TypeScript", "API Integration"]
        },
        {
            icon: Palette,
            title: "UI/UX Design",
            description: "Beautiful, intuitive designs that engage users and drive conversions.",
            features: ["Modern UI Design", "User Experience", "Wireframing", "Prototyping"]
        },
        {
            icon: Smartphone,
            title: "Mobile Apps",
            description: "Native and cross-platform mobile applications for iOS and Android.",
            features: ["React Native", "Flutter", "App Store Deployment", "Push Notifications"]
        },
        {
            icon: Globe,
            title: "E-Commerce",
            description: "Complete online store solutions with payment processing and inventory management.",
            features: ["Shopify", "WooCommerce", "Payment Integration", "Inventory Management"]
        },
        {
            icon: Database,
            title: "Backend Solutions",
            description: "Scalable server infrastructure and database management systems.",
            features: ["Cloud Hosting", "Database Design", "API Development", "Security"]
        },
        {
            icon: Zap,
            title: "Performance Optimization",
            description: "Speed up your website and improve user experience with our optimization services.",
            features: ["Page Speed", "SEO Optimization", "Core Web Vitals", "CDN Setup"]
        }
    ];

    return (
        <section className="py-20 px-6 bg-gray-900 text-white">
            <div className="container mx-auto">
                <div className="text-center mb-16 animate-slide-up">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-700">
                        Our Services
                    </h2>
                    <p className="text-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent max-w-2xl mx-auto">
                        Comprehensive digital solutions to transform your business and create exceptional user experiences.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card
                            key={index}
                            className="group bg-gradient-card backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-float hover:-translate-y-2 animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
                                        <service.icon className="w-6 h-6 text-fuchsia-500" />
                                    </div>
                                    <CardTitle className="text-xl text-white group-hover:text-blue-800 transition-colors">
                                        {service.title}
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-white mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#3b82f6', '#10b981', '#f97316'][featureIndex % 3] }} />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}

                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
// File: Services.tsx
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Monitor, Palette, Code, Image, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import * as Tooltip from '@radix-ui/react-tooltip';

// Define accent colors to rotate through
const accentColors = [
    { bg: 'bg-blue-600', text: 'text-blue-100', hover: 'hover:bg-blue-700' },
    { bg: 'bg-green-600', text: 'text-green-100', hover: 'hover:bg-green-700' },
    { bg: 'bg-orange-600', text: 'text-orange-100', hover: 'hover:bg-orange-700' },
];

const Services = () => {
    const [filter, setFilter] = useState('all');

    const services = [
        {
            icon: Monitor,
            title: 'Website Design',
            tag: 'Most Popular',
            description: 'We create visually stunning and user-friendly websites that not only look great but also convert visitors into customers. Our designs are modern, responsive, and tailored to your brand identity.',
            features: [
                'Responsive Design',
                'Modern UI/UX',
                'SEO Optimized',
                'Fast Loading',
                'Cross-browser Compatible',
                'Mobile First Approach'
            ],
            tools: [
                { name: 'Figma', description: 'Interface design tool' },
                { name: 'Adobe XD', description: 'UX/UI design software' },
                { name: 'Sketch', description: 'Digital design toolkit' },
                { name: 'InVision', description: 'Prototyping platform' }
            ],
            price: {
                basic: '$200',
                standard: '$500',
                premium: '$1200'
            },
            category: 'design'
        },
        {
            icon: Palette,
            title: 'UI/UX Design',
            description: 'Our UI/UX design services focus on creating intuitive and engaging user experiences. We conduct thorough research to understand your users and design interfaces that delight and convert.',
            features: [
                'User Research',
                'Wireframing',
                'Prototyping',
                'Usability Testing',
                'Design Systems',
                'Accessibility Focus'
            ],
            tools: [
                { name: 'Figma', description: 'Interface design tool' },
                { name: 'Adobe Creative Suite', description: 'Design software collection' },
                { name: 'Principle', description: 'Animation software' },
                { name: 'Framer', description: 'Interactive design tool' }
            ],
            price: {
                basic: '$1,800',
                standard: '$3,500',
                premium: '$6,000'
            },
            category: 'design'
        },
        {
            icon: Code,
            title: 'Web Development',
            tag: 'Trending',
            description: 'We build fast, secure, and scalable web applications using the latest technologies. From simple websites to complex web applications, we deliver solutions that perform exceptionally.',
            features: [
                'Custom Development',
                'CMS Integration',
                'E-commerce Solutions',
                'API Development',
                'Database Design',
                'Performance Optimization'
            ],
            tools: [
                { name: 'React', description: 'Frontend JavaScript library' },
                { name: 'Node.js', description: 'Backend JavaScript runtime' },
                { name: 'TypeScript', description: 'Typed JavaScript superset' },
                { name: 'Next.js', description: 'React framework' },
                { name: 'MongoDB', description: 'NoSQL database' },
                { name: 'PostgreSQL', description: 'Relational database' }
            ],
            price: {
                basic: '$2,000',
                standard: '$4,500',
                premium: '$8,000'
            },
            category: 'development'
        },
        {
            icon: Image,
            title: 'Graphic Design',
            description: 'Our graphic design services help you communicate your brand message effectively through compelling visual content. From logos to marketing materials, we create designs that make an impact.',
            features: [
                'Brand Identity',
                'Logo Design',
                'Marketing Materials',
                'Print Design',
                'Digital Assets',
                'Brand Guidelines'
            ],
            tools: [
                { name: 'Adobe Illustrator', description: 'Vector graphics editor' },
                { name: 'Photoshop', description: 'Image editing software' },
                { name: 'InDesign', description: 'Desktop publishing tool' },
                { name: 'After Effects', description: 'Motion graphics software' }
            ],
            price: {
                basic: '$200',
                standard: '$600',
                premium: '$1,200'
            },
            category: 'design'
        }
    ];

    const filteredServices = filter === 'all'
        ? services
        : services.filter(service => service.category === filter);

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navigation />

            {/* Hero Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Our <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We offer comprehensive digital solutions to help your business thrive in the digital landscape.
                        From concept to execution, we're your trusted partner in digital transformation.
                    </p>
                </div>
            </section>

            {/* Filter Buttons */}
            <section className="py-8 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            variant={filter === 'all' ? 'default' : 'outline'}
                            onClick={() => setFilter('all')}
                            className="transition-all"
                        >
                            All Services
                        </Button>
                        <Button
                            variant={filter === 'design' ? 'default' : 'outline'}
                            onClick={() => setFilter('design')}
                            className="transition-all"
                        >
                            Design Services
                        </Button>
                        <Button
                            variant={filter === 'development' ? 'default' : 'outline'}
                            onClick={() => setFilter('development')}
                            className="transition-all"
                        >
                            Development Services
                        </Button>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredServices.map((service, index) => {
                            const accent = accentColors[index % accentColors.length];
                            return (
                                <Card
                                    key={index}
                                    className={`border border-gray-800 bg-gray-800 rounded-xl shadow-lg hover:border-blue-500 transition-all duration-300 hover:shadow-xl relative overflow-hidden`}
                                >
                                    {service.tag && (
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${accent.bg} ${accent.text}`}>
                                            {service.tag}
                                        </div>
                                    )}
                                    <CardContent className="p-8">
                                        <div className="flex items-start space-x-6">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${accent.bg} hover:rotate-12 transition-transform`}>
                                                <service.icon className={`w-8 h-8 ${accent.text}`} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-3">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-400 mb-6 leading-relaxed">
                                                    {service.description}
                                                </p>

                                                {/* Features */}
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-white mb-3">What's Included:</h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {service.features.map((feature, featureIndex) => (
                                                            <div key={featureIndex} className="flex items-center space-x-2">
                                                                <CheckCircle className={`w-4 h-4 ${accent.text}`} />
                                                                <span className="text-sm text-gray-300">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Tools */}
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-white mb-3">Tools & Technologies:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {service.tools.map((tool, toolIndex) => (
                                                            <Tooltip.Provider key={toolIndex} delayDuration={100}>
                                                                <Tooltip.Root>
                                                                    <Tooltip.Trigger asChild>
                                                                        <span
                                                                            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium hover:bg-gray-600 transition-colors cursor-default"
                                                                        >
                                                                            {tool.name}
                                                                        </span>
                                                                    </Tooltip.Trigger>
                                                                    <Tooltip.Portal>
                                                                        <Tooltip.Content
                                                                            className="bg-gray-800 text-white px-3 py-2 rounded text-sm max-w-[200px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
                                                                            sideOffset={5}
                                                                        >
                                                                            {tool.description}
                                                                            <Tooltip.Arrow className="fill-gray-800" />
                                                                        </Tooltip.Content>
                                                                    </Tooltip.Portal>
                                                                </Tooltip.Root>
                                                            </Tooltip.Provider>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Pricing Tiers */}
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-white mb-3">Pricing Options:</h4>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div className="bg-gray-700 p-3 rounded-lg">
                                                            <h5 className="text-xs text-gray-400 mb-1">Basic</h5>
                                                            <p className={`text-lg font-bold ${accent.text}`}>{service.price.basic}</p>
                                                        </div>
                                                        <div className="bg-gray-700 p-3 rounded-lg border border-blue-500">
                                                            <h5 className="text-xs text-gray-400 mb-1">Standard</h5>
                                                            <p className={`text-lg font-bold ${accent.text}`}>{service.price.standard}</p>
                                                        </div>
                                                        <div className="bg-gray-700 p-3 rounded-lg">
                                                            <h5 className="text-xs text-gray-400 mb-1">Premium</h5>
                                                            <p className={`text-lg font-bold ${accent.text}`}>{service.price.premium}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Button */}
                                                <div className="flex items-center justify-between">
                                                    <Button
                                                        variant="hero"
                                                        className="hover:scale-105 transition-transform"
                                                        aria-label={`Get started with ${service.title}`}
                                                    >
                                                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quiz CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Not Sure Which Service You Need?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Take our 30-second quiz to find the perfect solution for your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="cta" size="lg" className="bg-white text-blue-900 hover:bg-blue-100">
                            Take Our Quiz
                        </Button>
                        <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                            Compare All Services
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">
                        What Our Clients Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <Card key={item} className="bg-gray-700 border-gray-600">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                                            {String.fromCharCode(64 + item)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Client {item}</h4>
                                            <p className="text-sm text-gray-400">CEO, Company {item}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">
                                        "The website design service completely transformed our online presence.
                                        Our conversion rates increased by 150% within the first month!"
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PortfolioPreview = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error('Error fetching projects:', err);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">Featured Projects</h2>
                    <p className="text-muted-foreground">See our work in action.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project: any, i: number) => (
                        <Card key={i} className="group overflow-hidden">
                            <div className="relative overflow-hidden">
                                <img
                                    src={project.imageUrl || '/placeholder.svg'}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2">
                                    <Button size="sm"><ExternalLink /></Button>
                                    <Button size="sm"><Github /></Button>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <span className="text-xs px-3 py-1 bg-accent rounded-full">{project.category}</span>
                                <h3 className="text-lg font-semibold mt-2">{project.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                <div className="flex flex-wrap mt-4 gap-2">
                                    {project.technologies.map((tech: string, idx: number) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-secondary rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioPreview;

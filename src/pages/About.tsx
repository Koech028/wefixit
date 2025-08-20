import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Clock, Heart, Lightbulb } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const team = [
    {
      name: "Titus Kipkoech",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "10+ years in digital design with a passion for creating meaningful user experiences."
    },
    {
      name: "Brian Kirwa",
      role: "Lead UI/UX Designer & COO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      bio: "Expert in user research and interface design, previously at top tech companies."
    },
    {
      name: "Michael Rodriguez",
      role: "Senior Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Full-stack developer specializing in modern web technologies and performance optimization."
    },
    {
      name: "Emily Davis",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Ensures projects run smoothly and clients are delighted with the process and results."
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Client-Focused",
      description: "Every decision we make is centered around delivering value to our clients and their users."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We stay ahead of trends and continuously explore new technologies to provide cutting-edge solutions."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Results-Driven",
      description: "We measure success by the tangible impact our work has on your business goals."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Reliability",
      description: "On-time delivery and clear communication are the foundations of our client relationships."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "2+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" }
  ];

   const timeline = [
    /*{
      year: "2023",
      title: "Company Founded",
      description: "Started with a vision to help businesses create meaningful digital experiences."
    },
    {
      year: "202",
      title: "Team Expansion",
      description: "Grew our team to include specialists in UI/UX design and development."
    },
    {
      year: "2021",
      title: "100+ Projects",
      description: "Reached the milestone of 100 completed projects across various industries."
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Received industry recognition for outstanding web design and client service."
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Expanded services to serve clients worldwide with diverse digital needs."
    },
    {
      year: "2024",
      title: "Innovation Focus",
      description: "Launched new services including AI integration and advanced web technologies."
    }*/
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">Ifixit</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're a passionate team of designers and developers dedicated to creating 
            digital experiences that drive results and delight users.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2024, Ifixit began with a simple mission: to help businesses 
                create digital experiences that truly matter. What started as a small design 
                studio has evolved into a full-service digital agency.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We believe that great design isn't just about how something looks—it's about 
                how it works, how it makes people feel, and how it drives business results. 
                This philosophy guides everything we do.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we're proud to have helped over 150 businesses transform their digital 
                presence and achieve their goals through thoughtful design and development.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600"
                alt="Team working together"
                className="rounded-lg shadow-2xl w-full"
              />
                          {/* <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg">
                <Award className="h-8 w-8 mb-2" />
                <div className="font-semibold">Award Winning</div>
                <div className="text-sm opacity-90">Design Agency</div>
              </div>*/}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core principles guide our work and shape our relationships with clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented individuals working together to bring your digital vision to life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key milestones that have shaped our growth and success.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your digital presence and achieve your business goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Get In Touch
              </a>
            <a href="/Quote" className="btn-primary">
              Start Your Project
             </a>
            <a href="/Portfolio" className="btn-secondary">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
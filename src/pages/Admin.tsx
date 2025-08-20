import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Trash2,
    Edit,
    Plus,
    Star,
    Eye,
    BarChart3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Testimonial {
    _id: string;
    name: string;
    company: string;
    message: string;
    rating: number;
    approved: boolean;
}

interface PortfolioItem {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    featured: boolean;
}

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        image: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/projects")
            .then((res) => setPortfolioItems(res.data))
            .catch((err) => console.error("Error fetching projects:", err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/reviews")
            .then((res) => setTestimonials(res.data))
            .catch((err) => console.error("Error fetching testimonials:", err));
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin@ifixit.com" && password === "admin123") {
            setIsLoggedIn(true);
            toast({
                title: "Login Successful",
                description: "Welcome to the admin dashboard!",
            });
        } else {
            toast({
                title: "Login Failed",
                description: "Invalid credentials. Use admin@ifixit.com / admin123",
                variant: "destructive",
            });
        }
    };

    const deletePortfolioItem = async (_id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${_id}`);
            setPortfolioItems(portfolioItems.filter((item) => item._id !== _id));
            toast({
                title: "Project Deleted",
                description: "The project has been removed successfully.",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: "Failed to delete project",
                variant: "destructive",
            });
        }
    };

    const toggleFeatured = async (_id: string) => {
        try {
            const updated = await axios.patch(`http://localhost:5000/api/projects/${_id}/toggle-feature`);
            setPortfolioItems(portfolioItems.map(item =>
                item._id === _id ? updated.data : item
            ));
            toast({
                title: "Project Updated",
                description: "Featured status has been updated.",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: "Failed to toggle featured status",
                variant: "destructive",
            });
        }
    };

    const approveTestimonial = async (id: string) => {
        try {
            await axios.patch(`http://localhost:5000/api/reviews/${id}/approve`);
            setTestimonials(testimonials.map(t =>
                t._id === id ? { ...t, approved: true } : t
            ));
            toast({ title: "Approved", description: "Testimonial approved" });
        } catch (err) {
            console.error(err);
            toast({ title: "Error", description: "Failed to approve", variant: "destructive" });
        }
    };

    const deleteTestimonial = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`);
            setTestimonials(testimonials.filter(t => t._id !== id));
            toast({ title: "Deleted", description: "Testimonial removed" });
        } catch (err) {
            console.error(err);
            toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleProjectFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            if (imageFile) data.append("image", imageFile);

            let res;
            if (editingProject) {
                res = await axios.put(
                    `http://localhost:5000/api/projects/${editingProject._id}`,
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setPortfolioItems(prev =>
                    prev.map(p => (p._id === editingProject._id ? res.data : p))
                );
                toast({ title: "Project Updated" });
            } else {
                res = await axios.post(
                    "http://localhost:5000/api/projects",
                    data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setPortfolioItems(prev => [res.data, ...prev]);
                toast({ title: "Project Added" });
            }

            setShowProjectForm(false);
            setEditingProject(null);
            setFormData({ title: "", description: "", category: "", image: "" });
            setImageFile(null);
        } catch (err) {
            console.error(err);
            toast({ title: "Error", description: "Could not save project", variant: "destructive" });
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription>
                            Enter your credentials to access the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@ifixit.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                            <p className="text-sm text-muted-foreground text-center">
                                Demo: admin@ifixit.com / admin123
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your content and settings</p>
                    </div>
                    <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                        Logout
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card><CardContent className="p-6"><div className="flex items-center"><BarChart3 className="h-8 w-8 text-primary" /><div className="ml-4"><p className="text-sm font-medium text-muted-foreground">Total Projects</p><p className="text-2xl font-bold">{portfolioItems.length}</p></div></div></CardContent></Card>
                    <Card><CardContent className="p-6"><div className="flex items-center"><Star className="h-8 w-8 text-primary" /><div className="ml-4"><p className="text-sm font-medium text-muted-foreground">Testimonials</p><p className="text-2xl font-bold">{testimonials.length}</p></div></div></CardContent></Card>
                    <Card><CardContent className="p-6"><div className="flex items-center"><Eye className="h-8 w-8 text-primary" /><div className="ml-4"><p className="text-sm font-medium text-muted-foreground">Pending Reviews</p><p className="text-2xl font-bold">{testimonials.filter(t => !t.approved).length}</p></div></div></CardContent></Card>
                    <Card><CardContent className="p-6"><div className="flex items-center"><Plus className="h-8 w-8 text-primary" /><div className="ml-4"><p className="text-sm font-medium text-muted-foreground">Featured Projects</p><p className="text-2xl font-bold">{portfolioItems.filter(p => p.featured).length}</p></div></div></CardContent></Card>
                </div>

                <Tabs defaultValue="portfolio" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
                        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    </TabsList>

                    <TabsContent value="portfolio" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Portfolio Items</h2>
                            <Button
                                onClick={() => {
                                    setEditingProject(null);
                                    setFormData({ title: "", description: "", category: "", image: "" });
                                    setShowProjectForm(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add New Project
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {portfolioItems.map((item) => (
                                <Card key={item._id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    {item.featured && (
                                                        <Badge variant="secondary">Featured</Badge>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                                <p className="text-sm font-medium mb-2">{item.category}</p>
                                                <div className="flex items-center space-x-2">
                                                    <Button variant="outline" size="sm" onClick={() => toggleFeatured(item._id)}>
                                                        <Star className="mr-1 h-3 w-3" />
                                                        {item.featured ? 'Unfeature' : 'Feature'}
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => {
                                                        setEditingProject(item);
                                                        setFormData({
                                                            title: item.title,
                                                            description: item.description,
                                                            category: item.category,
                                                            image: item.image,
                                                        });
                                                        setShowProjectForm(true);
                                                    }}>
                                                        <Edit className="mr-1 h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => deletePortfolioItem(item._id)}>
                                                        <Trash2 className="mr-1 h-3 w-3" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="testimonials" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Client Testimonials</h2>
                            <Button>View All Reviews</Button>
                        </div>
                        <div className="space-y-4">
                            {testimonials.map((testimonial) => (
                                <Card key={testimonial._id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold">{testimonial.name}</h3>
                                                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                                <div className="flex items-center mt-2">
                                                    {[...Array(testimonial.rating || 0)].map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {testimonial.approved ? (
                                                    <Badge variant="default">Approved</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Pending</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm mb-4">{testimonial.message}</p>
                                        <div className="flex items-center space-x-2">
                                            {!testimonial.approved && (
                                                <Button variant="default" size="sm" onClick={() => approveTestimonial(testimonial._id)}>
                                                    Approve
                                                </Button>
                                            )}
                                            <Button variant="destructive" size="sm" onClick={() => deleteTestimonial(testimonial._id)}>
                                                <Trash2 className="mr-1 h-3 w-3" />
                                                Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Project Modal */}
            {showProjectForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <Card className="w-full max-w-lg p-6 bg-white">
                        <CardHeader>
                            <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleProjectFormSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Input
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Input
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Image Upload</Label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {imageFile ? (
                                        <p className="text-sm mt-2">{imageFile.name}</p>
                                    ) : formData.image && (
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover mt-2 rounded-md"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <Button type="submit">Save</Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowProjectForm(false);
                                            setFormData({ title: "", description: "", category: "", image: "" });
                                            setImageFile(null);
                                            setEditingProject(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Admin;
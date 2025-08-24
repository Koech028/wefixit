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
import { Trash2, Edit, Plus, Star, Eye, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api"; // centralized axios instance

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
    image_url: string;
    is_featured: boolean;
    is_active: boolean;
}

const Admin = () => {
    const { toast } = useToast();
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

    // --- Fetch portfolio & reviews ---
    useEffect(() => {
        api.get("/portfolio/")   // ✅ matches GET /api/v1/portfolio/
            .then((res) => {
                if (res.data && res.data.items) {
                    setPortfolioItems(res.data.items || []);
                } else {
                    console.error("Unexpected response format:", res.data);
                    setPortfolioItems([]);
                }
            })
            .catch((err) => console.error("Error fetching projects:", err));

        api.get("/reviews/")     // ✅ matches GET /api/v1/reviews/
            .then((res) => setTestimonials(res.data || []))
            .catch((err) => console.error("Error fetching testimonials:", err));
    }, []);

    // Login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append("username", email);
            params.append("password", password);

            const res = await api.post("/auth/login", params, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            });

            const { access_token, token_type } = res.data;
            localStorage.setItem("token", `${token_type} ${access_token}`);

            setIsLoggedIn(true);
            toast({ title: "Login Successful" });
        } catch {
            toast({
                title: "Login Failed",
                description: "Invalid credentials",
                variant: "destructive",
            });
        }
    };

    // --- Delete Portfolio ---
    const deletePortfolioItem = async (_id: string) => {
        if (!_id) return;
        try {
            await api.delete(`/portfolio/${_id}`); // ✅ DELETE /api/v1/portfolio/{id}
            setPortfolioItems((prev) => prev.filter((p) => p._id !== _id));
            toast({ title: "Deleted", description: "Project removed." });
        } catch {
            toast({ title: "Error", description: "Failed to delete project", variant: "destructive" });
        }
    };

    // --- Toggle Featured ---
    const toggleFeatured = async (_id: string) => {
        try {
            const item = portfolioItems.find((p) => p._id === _id);
            const res = await api.put(`/portfolio/${_id}`, { is_featured: !item?.is_featured });
            setPortfolioItems((prev) => prev.map((p) => (p._id === _id ? res.data : p)));
            toast({ title: "Updated", description: "Featured status changed." });
        } catch {
            toast({ title: "Error", description: "Failed to update", variant: "destructive" });
        }
    };

    // Approve Testimonial
    const approveTestimonial = async (id: string) => {
        try {
            await api.put(`/reviews/${id}`, { approved: true });
            setTestimonials((prev) => prev.map((t) => (t._id === id ? { ...t, approved: true } : t)));
            toast({ title: "Approved", description: "Testimonial approved" });
        } catch {
            toast({ title: "Error", description: "Failed to approve", variant: "destructive" });
        }
    };

    // Delete Testimonial
    const deleteTestimonial = async (id: string) => {
        try {
            await api.delete(`/reviews/${id}`);
            setTestimonials((prev) => prev.filter((t) => t._id !== id));
            toast({ title: "Deleted", description: "Testimonial removed" });
        } catch {
            toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
        }
    };

    // Image Upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setImageFile(file);
    };

    // --- Save Project ---
    const handleProjectFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title.trim());
            data.append("description", formData.description.trim());
            data.append("category", formData.category);
            data.append("is_featured", editingProject?.is_featured ? "true" : "false");
            data.append("is_active", "true");

            if (imageFile) {
                data.append("image", imageFile);
            } else if (editingProject?.image_url && !imageFile) {
                data.append("image_url", editingProject.image_url);
            }

            let res;
            if (editingProject?._id) {
                // ✅ PUT /api/v1/portfolio/{id}
                res = await api.put(`/portfolio/${editingProject._id}`, data);
                setPortfolioItems((prev) =>
                    prev.map((p) => (p._id === editingProject._id ? res.data : p))
                );
                toast({ title: "Project Updated" });
            } else {
                // ✅ POST /api/v1/portfolio/
                res = await api.post(`/portfolio/`, data);
                setPortfolioItems((prev) => [res.data, ...prev]);
                toast({ title: "Project Added" });
            }

            setShowProjectForm(false);
            setEditingProject(null);
            setFormData({ title: "", description: "", category: "", image: "" });
            setImageFile(null);
        } catch (error) {
            console.error("Save project error:", error);
            toast({ title: "Error", description: "Failed to save project", variant: "destructive" });
        }
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    // Login Form
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Username</Label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Password</Label>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <Button type="submit" className="w-full">Sign In</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your content and settings</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card><CardContent className="p-6 flex items-center"><BarChart3 className="h-8 w-8 text-primary" /><div className="ml-4"><p>Total Projects</p><p className="text-2xl font-bold">{portfolioItems.length}</p></div></CardContent></Card>
                    <Card><CardContent className="p-6 flex items-center"><Star className="h-8 w-8 text-primary" /><div className="ml-4"><p>Testimonials</p><p className="text-2xl font-bold">{testimonials.length}</p></div></CardContent></Card>
                    <Card><CardContent className="p-6 flex items-center"><Eye className="h-8 w-8 text-primary" /><div className="ml-4"><p>Pending Reviews</p><p className="text-2xl font-bold">{testimonials.filter(t => !t.approved).length}</p></div></CardContent></Card>
                    <Card><CardContent className="p-6 flex items-center"><Plus className="h-8 w-8 text-primary" /><div className="ml-4"><p>Featured Projects</p><p className="text-2xl font-bold">{portfolioItems.filter(p => p.is_featured).length}</p></div></CardContent></Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="portfolio" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
                        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    </TabsList>

                    {/* Portfolio Tab */}
                    <TabsContent value="portfolio" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Portfolio Items</h2>
                            <Button onClick={() => {
                                setEditingProject(null);
                                setFormData({ title: "", description: "", category: "", image: "" });
                                setShowProjectForm(true);
                            }}>
                                <Plus className="mr-2 h-4 w-4" /> Add New Project
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {portfolioItems.map((item) => (
                                <Card key={item._id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <img src={item.image_url} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-semibold">{item.title}</h3>
                                                    {item.is_featured && <Badge variant="secondary">Featured</Badge>}
                                                </div>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                                <p className="text-sm font-medium">{item.category}</p>
                                                <div className="flex space-x-2 mt-2">
                                                    <Button variant="outline" size="sm" onClick={() => toggleFeatured(item._id)}>
                                                        {item.is_featured ? "Unfeature" : "Feature"}
                                                    </Button>
                                                    <Button variant="outline" size="sm" onClick={() => {
                                                        setEditingProject(item);
                                                        setFormData({
                                                            title: item.title,
                                                            description: item.description,
                                                            category: item.category,
                                                            image: item.image_url
                                                        });
                                                        setShowProjectForm(true);
                                                    }}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="destructive" size="sm" onClick={() => deletePortfolioItem(item._id)}>
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

                    {/* Testimonials Tab */}
                    <TabsContent value="testimonials" className="space-y-6">
                        <h2 className="text-xl font-semibold">Client Testimonials</h2>
                        {testimonials.map((t) => (
                            <Card key={t._id}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold">{t.name}</h3>
                                            <p className="text-sm text-muted-foreground">{t.company}</p>
                                            <div className="flex mt-2">
                                                {[...Array(t.rating || 0)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                                ))}
                                            </div>
                                        </div>
                                        {t.approved ? <Badge>Approved</Badge> : <Badge variant="secondary">Pending</Badge>}
                                    </div>
                                    <p className="text-sm mb-4">{t.message}</p>
                                    <div className="flex space-x-2">
                                        {!t.approved && <Button size="sm" onClick={() => approveTestimonial(t._id)}>Approve</Button>}
                                        <Button size="sm" variant="destructive" onClick={() => deleteTestimonial(t._id)}>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Project Modal */}
            {showProjectForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg p-6">
                        <CardHeader><CardTitle>{editingProject ? "Edit Project" : "Add Project"}</CardTitle></CardHeader>
                        <CardContent>
                            <form onSubmit={handleProjectFormSubmit} className="space-y-4">
                                <div><Label>Title</Label><Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required /></div>
                                <div><Label>Description</Label><Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required /></div>
                                <div><Label>Category</Label><Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required /></div>
                                <div>
                                    <Label>Image</Label>
                                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                                    {imageFile ? <p className="text-sm mt-2">{imageFile.name}</p> : formData.image && <img src={formData.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded-md" />}
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <Button type="submit">Save</Button>
                                    <Button type="button" variant="outline" onClick={() => {
                                        setShowProjectForm(false);
                                        setEditingProject(null);
                                        setFormData({ title: "", description: "", category: "", image: "" });
                                        setImageFile(null);
                                    }}>
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
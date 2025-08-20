import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Send, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Review {
    _id: string;
    name: string;
    company: string;
    message: string;
    rating: number;
    approved: boolean;
    projectType?: string;  // <-- Add this line
    createdAt?: string;
}

const Reviews = () => {
    const { toast } = useToast();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRating, setFilterRating] = useState("all");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        rating: 5,
        message: "",
        projectType: ""
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/reviews");
                if (!res.ok) {
                    throw new Error("Failed to fetch reviews");
                }
                const data: Review[] = await res.json();
                const approvedOnly = data.filter((r: Review) => r.approved);
                setReviews(approvedOnly);
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
                toast({
                    title: "Error",
                    description: "Could not load reviews",
                    variant: "destructive",
                });
            }
        };

        fetchReviews();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating: number) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast({
                    title: "Review Submitted!",
                    description: "Thanks! Your review will appear once approved.",
                });
                setFormData({
                    name: "",
                    email: "",
                    company: "",
                    rating: 5,
                    message: "",
                    projectType: ""
                });
                setShowForm(false);
            } else {
                const error = await response.json();
                toast({
                    title: "Submission Failed",
                    description: error.message || "Something went wrong.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Network Error",
                description: "Please check your connection and try again.",
                variant: "destructive"
            });
        }
    };

    const filteredReviews = reviews.filter(review => {
        const matchesSearch =
            review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.message?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRating =
            filterRating === "all" || String(review.rating) === filterRating;

        return matchesSearch && matchesRating;
    });

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
            <Navigation />

            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Client Reviews & Testimonials</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        See what our clients say about working with Ifixit
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center items-center space-x-8 mb-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-6 w-6 ${i < Math.floor(averageRating)
                                                ? "fill-primary text-primary"
                                                : "text-muted-foreground"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                            <p className="text-sm text-muted-foreground">Average Rating</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">{reviews.length}</p>
                            <p className="text-sm text-muted-foreground">Total Reviews</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold">100%</p>
                            <p className="text-sm text-muted-foreground">Satisfied Clients</p>
                        </div>
                    </div>

                    <Button onClick={() => setShowForm(!showForm)} className="mb-8">
                        <Send className="mr-2 h-4 w-4" />
                        Write a Review
                    </Button>
                </div>

                {/* Review Form */}
                {showForm && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Share Your Experience</CardTitle>
                            <CardDescription>
                                Tell us about your project and help others learn about our services
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="projectType">Project Type</Label>
                                        <Input
                                            id="projectType"
                                            name="projectType"
                                            placeholder="e.g., Web Design, UI/UX, etc."
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Rating *</Label>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRatingChange(star)}
                                                className="focus:outline-none"
                                            >
                                                <Star
                                                    className={`h-8 w-8 cursor-pointer ${star <= formData.rating
                                                            ? "fill-primary text-primary"
                                                            : "text-muted-foreground"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm text-muted-foreground">
                                            ({formData.rating} star{formData.rating !== 1 ? "s" : ""})
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Review *</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Share your experience working with Ifixit..."
                                        className="min-h-[120px]"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        <Send className="mr-2 h-4 w-4" />
                                        Submit Review
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search reviews..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <select
                            value={filterRating}
                            onChange={(e) => setFilterRating(e.target.value)}
                            className="px-3 py-2 border border-input bg-background rounded-md text-sm"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReviews.map((review) => (
                        <Card key={review._id} className="h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold">{review.name}</h3>
                                        <p className="text-sm text-muted-foreground">{review.company}</p>
                                    </div>
                                    {review.approved && (
                                        <Badge variant="secondary" className="text-xs">
                                            Verified
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-sm mb-4 line-clamp-4">{review.message}</p>

                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">
                                        {review.projectType}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredReviews.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No reviews found matching your criteria.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Reviews;

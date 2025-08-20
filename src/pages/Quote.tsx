import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Send, Calculator, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Quote = () => {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [estimatedCost, setEstimatedCost] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: "",
        email: "",
        phone: "",
        company: "",

        // Step 2: Project Details
        serviceType: "",
        projectTitle: "",
        description: "",

        // Step 3: Requirements
        features: [] as string[],
        timeline: "",
        budget: "",

        // Step 4: Additional Info
        hasExistingWebsite: "",
        preferredStyle: "",
        targetAudience: "",
        additionalNotes: ""
    });

    const services = [
        { id: "web-design", name: "Website Design", basePrice: 200 },
        { id: "ui-ux", name: "UI/UX Design", basePrice: 200 },
        { id: "web-dev", name: "Web Development", basePrice: 300 },
        { id: "graphic-design", name: "Graphic Design", basePrice: 150 },
        { id: "full-stack", name: "Full Stack Solution", basePrice: 500 }
    ];

    const commonFeatures = [
        { id: "responsive", name: "Responsive Design", price: 0 },
        { id: "cms", name: "Content Management System", price: 800 },
        { id: "ecommerce", name: "E-commerce Functionality", price: 1000 },
        { id: "seo", name: "SEO Optimization", price: 600 },
        { id: "analytics", name: "Analytics Integration", price: 300 },
        { id: "social", name: "Social Media Integration", price: 400 },
        { id: "blog", name: "Blog System", price: 200 },
        { id: "booking", name: "Booking/Appointment System", price: 1200 },
        { id: "payment", name: "Payment Gateway", price: 800 },
        { id: "multilingual", name: "Multi-language Support", price: 700 }
    ];

    const validateStep = (step: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (step === 1) {
            if (!formData.name.trim()) newErrors.name = "Full name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                newErrors.email = "Please enter a valid email";
            }
        }

        if (step === 2) {
            if (!formData.serviceType) newErrors.serviceType = "Please select a service";
            if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required";
            if (!formData.description.trim()) newErrors.description = "Project description is required";
        }

        if (step === 3) {
            if (!formData.timeline) newErrors.timeline = "Please select a timeline";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is filled
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        calculateEstimate();
    };

    const handleFeatureToggle = (featureId: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(f => f !== featureId)
                : [...prev.features, featureId]
        }));
        calculateEstimate();
    };

    const calculateEstimate = () => {
        const service = services.find(s => s.id === formData.serviceType);
        const basePrice = service?.basePrice || 0;

        const featuresPrice = formData.features.reduce((total, featureId) => {
            const feature = commonFeatures.find(f => f.id === featureId);
            return total + (feature?.price || 0);
        }, 0);

        let timelineMultiplier = 1;
        if (formData.timeline === "urgent") timelineMultiplier = 1.5;
        else if (formData.timeline === "fast") timelineMultiplier = 1.2;

        const totalEstimate = (basePrice + featuresPrice) * timelineMultiplier;
        setEstimatedCost(totalEstimate);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all steps before submission
        let isValid = true;
        for (let i = 1; i <= 4; i++) {
            if (!validateStep(i)) {
                isValid = false;
            }
        }

        if (!isValid) {
            toast({
                title: "Please complete all required fields",
                description: "There are errors in your form that need to be corrected",
                variant: "destructive"
            });
            return;
        }

        toast({
            title: "Quote Request Submitted!",
            description: "We'll review your requirements and get back to you within 24 hours with a detailed proposal."
        });

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            serviceType: "",
            projectTitle: "",
            description: "",
            features: [],
            timeline: "",
            budget: "",
            hasExistingWebsite: "",
            preferredStyle: "",
            targetAudience: "",
            additionalNotes: ""
        });
        setStep(1);
        setEstimatedCost(0);
        setErrors({});
    };

    const nextStep = () => {
        if (!validateStep(step)) return;
        setStep(prev => Math.min(prev + 1, 4));
    };

    const prevStep = () => {
        setStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
            <Navigation />

            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Get a customized quote for your project in just a few steps
                    </p>

                    {/* Progress Steps */}
                    <div className="flex justify-center items-center space-x-4 mb-8">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div key={stepNumber} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                                </div>
                                {stepNumber < 4 && (
                                    <div className={`w-12 h-1 mx-2 ${step > stepNumber ? 'bg-primary' : 'bg-muted'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        {step === 1 && "Basic Information"}
                                        {step === 2 && "Project Details"}
                                        {step === 3 && "Requirements & Features"}
                                        {step === 4 && "Additional Information"}
                                    </CardTitle>
                                    <CardDescription>
                                        {step === 1 && "Tell us about yourself and your business"}
                                        {step === 2 && "Describe your project and goals"}
                                        {step === 3 && "Select features and timeline preferences"}
                                        {step === 4 && "Any additional details that will help us understand your needs"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Step 1: Basic Information */}
                                        {step === 1 && (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Full Name *</Label>
                                                        <Input
                                                            id="name"
                                                            value={formData.name}
                                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                                            className={errors.name ? "border-destructive" : ""}
                                                        />
                                                        {errors.name && (
                                                            <p className="text-sm text-destructive flex items-center">
                                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                                {errors.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email Address *</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                                            className={errors.email ? "border-destructive" : ""}
                                                        />
                                                        {errors.email && (
                                                            <p className="text-sm text-destructive flex items-center">
                                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                                {errors.email}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone">Phone Number</Label>
                                                        <Input
                                                            id="phone"
                                                            value={formData.phone}
                                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="company">Company/Organization</Label>
                                                        <Input
                                                            id="company"
                                                            value={formData.company}
                                                            onChange={(e) => handleInputChange("company", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 2: Project Details */}
                                        {step === 2 && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Service Type *</Label>
                                                    <Select
                                                        value={formData.serviceType}
                                                        onValueChange={(value) => handleInputChange("serviceType", value)}
                                                    >
                                                        <SelectTrigger className={errors.serviceType ? "border-destructive" : ""}>
                                                            <SelectValue placeholder="Select a service" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {services.map((service) => (
                                                                <SelectItem key={service.id} value={service.id}>
                                                                    {service.name} (Starting from ${service.basePrice.toLocaleString()})
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.serviceType && (
                                                        <p className="text-sm text-destructive flex items-center">
                                                            <AlertCircle className="h-4 w-4 mr-1" />
                                                            {errors.serviceType}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="projectTitle">Project Title *</Label>
                                                    <Input
                                                        id="projectTitle"
                                                        value={formData.projectTitle}
                                                        onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                                                        placeholder="e.g., Corporate Website Redesign"
                                                        className={errors.projectTitle ? "border-destructive" : ""}
                                                    />
                                                    {errors.projectTitle && (
                                                        <p className="text-sm text-destructive flex items-center">
                                                            <AlertCircle className="h-4 w-4 mr-1" />
                                                            {errors.projectTitle}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="description">Project Description *</Label>
                                                    <Textarea
                                                        id="description"
                                                        value={formData.description}
                                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                                        placeholder="Describe your project goals, target audience, and any specific requirements..."
                                                        className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                                                    />
                                                    {errors.description && (
                                                        <p className="text-sm text-destructive flex items-center">
                                                            <AlertCircle className="h-4 w-4 mr-1" />
                                                            {errors.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Requirements & Features */}
                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <Label>Features & Functionality</Label>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {commonFeatures.map((feature) => (
                                                            <div key={feature.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={feature.id}
                                                                    checked={formData.features.includes(feature.id)}
                                                                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                                                                />
                                                                <Label htmlFor={feature.id} className="flex-1">
                                                                    {feature.name}
                                                                    {feature.price > 0 && (
                                                                        <span className="text-sm text-muted-foreground ml-1">
                                                                            (+${feature.price})
                                                                        </span>
                                                                    )}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Project Timeline *</Label>
                                                    <RadioGroup
                                                        value={formData.timeline}
                                                        onValueChange={(value) => handleInputChange("timeline", value)}
                                                        className={errors.timeline ? "border border-destructive rounded-md p-4" : ""}
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="standard" id="standard" />
                                                            <Label htmlFor="standard">Standard (8-12 weeks)</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="fast" id="fast" />
                                                            <Label htmlFor="fast">Fast Track (4-6 weeks) +20%</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="urgent" id="urgent" />
                                                            <Label htmlFor="urgent">Urgent (2-3 weeks) +50%</Label>
                                                        </div>
                                                    </RadioGroup>
                                                    {errors.timeline && (
                                                        <p className="text-sm text-destructive flex items-center">
                                                            <AlertCircle className="h-4 w-4 mr-1" />
                                                            {errors.timeline}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Budget Range</Label>
                                                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your budget range" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="under-5k">Under $200</SelectItem>
                                                            <SelectItem value="5k-10k">$300 - $500</SelectItem>
                                                            <SelectItem value="10k-25k">$600 - $1,000</SelectItem>
                                                            <SelectItem value="25k-50k">$1100 - $2,000</SelectItem>
                                                            <SelectItem value="over-50k">Over $3,000</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 4: Additional Information */}
                                        {step === 4 && (
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Do you have an existing website?</Label>
                                                    <RadioGroup value={formData.hasExistingWebsite} onValueChange={(value) => handleInputChange("hasExistingWebsite", value)}>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="yes" id="existing-yes" />
                                                            <Label htmlFor="existing-yes">Yes, needs redesign/update</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="existing-no" />
                                                            <Label htmlFor="existing-no">No, starting from scratch</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="preferredStyle">Preferred Design Style</Label>
                                                    <Input
                                                        id="preferredStyle"
                                                        value={formData.preferredStyle}
                                                        onChange={(e) => handleInputChange("preferredStyle", e.target.value)}
                                                        placeholder="e.g., Modern, Minimalist, Corporate, Creative"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="targetAudience">Target Audience</Label>
                                                    <Input
                                                        id="targetAudience"
                                                        value={formData.targetAudience}
                                                        onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                                                        placeholder="e.g., Young professionals, B2B clients, General consumers"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                                                    <Textarea
                                                        id="additionalNotes"
                                                        value={formData.additionalNotes}
                                                        onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                                                        placeholder="Any other requirements, preferences, or questions..."
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Navigation Buttons */}
                                        <div className="flex justify-between pt-6">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={prevStep}
                                                disabled={step === 1}
                                            >
                                                Previous
                                            </Button>

                                            {step < 4 ? (
                                                <Button type="button" onClick={nextStep}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button type="submit">
                                                    <Send className="mr-2 h-4 w-4" />
                                                    Submit Request
                                                </Button>
                                            )}
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Estimate Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-8">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <Calculator className="mr-2 h-5 w-5" />
                                        Estimate
                                    </CardTitle>
                                    <CardDescription>
                                        Based on your selections
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.serviceType && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm">Base Service:</span>
                                                <span className="text-sm font-medium">
                                                    ${services.find(s => s.id === formData.serviceType)?.basePrice.toLocaleString()}
                                                </span>
                                            </div>

                                            {formData.features.length > 0 && (
                                                <>
                                                    <div className="text-sm font-medium">Features:</div>
                                                    {formData.features.map(featureId => {
                                                        const feature = commonFeatures.find(f => f.id === featureId);
                                                        return feature && feature.price > 0 ? (
                                                            <div key={featureId} className="flex justify-between text-sm">
                                                                <span>{feature.name}</span>
                                                                <span>+${feature.price}</span>
                                                            </div>
                                                        ) : null;
                                                    })}
                                                </>
                                            )}

                                            {formData.timeline && formData.timeline !== "standard" && (
                                                <div className="flex justify-between text-sm">
                                                    <span>Timeline ({formData.timeline}):</span>
                                                    <span>
                                                        +{formData.timeline === "fast" ? "20%" : "50%"}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="border-t pt-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="font-semibold">Estimated Total:</span>
                                                    <span className="text-lg font-bold text-primary">
                                                        ${estimatedCost.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3 pt-4 border-t">
                                        <div className="flex items-center text-sm">
                                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                            Free consultation call
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                            No hidden fees
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                            Money-back guarantee
                                        </div>
                                    </div>

                                    <div className="bg-muted p-3 rounded-lg">
                                        <p className="text-xs text-muted-foreground">
                                            * This is an estimate. Final pricing will be provided in your detailed proposal.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Quote;
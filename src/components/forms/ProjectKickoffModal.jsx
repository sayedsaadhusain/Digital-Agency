import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle2, Loader2, Layout, Smartphone, ShoppingCart, RefreshCw, HelpCircle, Target, Zap, TrendingUp, Settings, ChevronRight, ArrowLeft, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectKickoffModal = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});

    // Refs for focus management
    const topRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        projectType: '',
        primaryGoal: '',
        description: '',
        timeline: '',
        budget: '',
        name: '',
        email: '',
        whatsapp: ''
    });

    // Options for Step 1
    const projectTypes = [
        { id: 'website', label: 'Website', icon: Layout },
        { id: 'webapp', label: 'Web App / SaaS', icon: Smartphone },
        { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
        { id: 'redesign', label: 'Redesign', icon: RefreshCw },
        { id: 'other', label: 'Not Sure', icon: HelpCircle },
    ];

    const goals = [
        { id: 'leads', label: 'Generate Leads', icon: Target },
        { id: 'sales', label: 'Increase Sales', icon: TrendingUp },
        { id: 'scale', label: 'Scale Product', icon: Zap },
        { id: 'system', label: 'Internal System', icon: Settings },
    ];

    const timelines = ['ASAP', '2-4 weeks', '1-3 months', 'Flexible'];
    const budgets = ['₹25k–₹50k', '₹50k–₹1L', '₹1L+', 'Not sure yet'];

    // Auto-scroll to top on step change
    useEffect(() => {
        if (open) {
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [step, open]);

    const handleNext = () => {
        const newErrors = {};
        if (!formData.projectType) newErrors.projectType = "Please select a project type";
        if (!formData.primaryGoal) newErrors.primaryGoal = "Please select a primary goal";
        if (!formData.description) newErrors.description = "Please briefly describe your project";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.name || !formData.email) {
            setLoading(false);
            return; // HTML5 validation will typically catch this
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "7caa3cbd-de74-417b-abe3-e3a593207388",
                    subject: `🚀 New Project: ${formData.projectType} (${formData.name})`,
                    from_name: "BrandIgnite Kickoff",
                    replyto: formData.email,
                    name: formData.name,
                    email: formData.email,
                    // We construct a custom message and DO NOT include other fields top-level to prevent duplication in the email
                    message: `
                        -- PROJECT VISUALIZATION --
                        Type: ${formData.projectType}
                        Goal: ${formData.primaryGoal}
                        Timeline: ${formData.timeline}
                        Budget: ${formData.budget}
                        
                        -- DESCRIPTION --
                        ${formData.description}
                        
                        -- CONTACT DETAILS --
                        Name: ${formData.name}
                        Email: ${formData.email}
                        WhatsApp: ${formData.whatsapp || "Not provided"}
                    `
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSuccess(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error", error);
            alert("Error submitting. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setSuccess(false);
        setErrors({});
        setFormData({
            projectType: '',
            primaryGoal: '',
            description: '',
            timeline: '',
            budget: '',
            name: '',
            email: '',
            whatsapp: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setTimeout(resetForm, 300);
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-black/95 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_-20px_rgba(var(--primary),0.3)]">

                {/* Visual Header / Progress */}
                <div className="h-1.5 bg-white/5 w-full">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                        style={{ width: success ? '100%' : step === 1 ? '50%' : '90%' }}
                    />
                </div>

                {!success ? (
                    <div className="p-8 md:p-10 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div ref={topRef} />

                        {/* Step 1: The Vision */}
                        {step === 1 && (
                            <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 fade-in">
                                <div className="space-y-2">
                                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Start Your Project</h2>
                                    <p className="text-lg text-muted-foreground">Tell us about your idea. We’ll review it and suggest the best way forward.</p>
                                </div>

                                {/* Project Type */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-base font-semibold text-white">What are you building?</label>
                                        {errors.projectType && <span className="text-red-400 text-sm flex items-center animate-pulse"><AlertCircle className="w-3 h-3 mr-1" /> {errors.projectType}</span>}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {projectTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => {
                                                    setFormData({ ...formData, projectType: type.label });
                                                    if (errors.projectType) setErrors({ ...errors, projectType: null });
                                                }}
                                                className={cn(
                                                    "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-200 gap-3 hover:bg-white/5 hover:border-primary/30 group",
                                                    formData.projectType === type.label
                                                        ? "bg-primary/20 border-primary text-white shadow-[0_0_20px_rgba(var(--primary),0.2)]"
                                                        : "bg-white/5 border-white/10 text-muted-foreground"
                                                )}
                                            >
                                                <type.icon className={cn("w-8 h-8 transition-transform group-hover:scale-110 duration-300", formData.projectType === type.label ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                                                <span className="text-sm font-medium">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Goal */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-base font-semibold text-white">What is the primary goal?</label>
                                        {errors.primaryGoal && <span className="text-red-400 text-sm flex items-center animate-pulse"><AlertCircle className="w-3 h-3 mr-1" /> {errors.primaryGoal}</span>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {goals.map((goal) => (
                                            <button
                                                key={goal.id}
                                                onClick={() => {
                                                    setFormData({ ...formData, primaryGoal: goal.label });
                                                    if (errors.primaryGoal) setErrors({ ...errors, primaryGoal: null });
                                                }}
                                                className={cn(
                                                    "flex items-center p-4 rounded-xl border transition-all text-left gap-4 hover:bg-white/5 hover:border-primary/30 group",
                                                    formData.primaryGoal === goal.label
                                                        ? "bg-primary/20 border-primary text-white"
                                                        : "bg-white/5 border-white/10 text-muted-foreground"
                                                )}
                                            >
                                                <div className={cn("p-2 rounded-lg bg-black/20", formData.primaryGoal === goal.label ? "text-primary" : "text-muted-foreground group-hover:text-primary")}>
                                                    <goal.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-base font-medium">{goal.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-base font-semibold text-white">Project Description</label>
                                        {errors.description && <span className="text-red-400 text-sm flex items-center animate-pulse"><AlertCircle className="w-3 h-3 mr-1" /> {errors.description}</span>}
                                    </div>
                                    <Textarea
                                        placeholder="Briefly describe what you want to build, who it’s for, and any specific features..."
                                        className="bg-white/5 border-white/10 min-h-[120px] text-base p-4 focus-visible:ring-primary/50 resize-none rounded-xl"
                                        value={formData.description}
                                        onChange={(e) => {
                                            setFormData({ ...formData, description: e.target.value });
                                            if (errors.description) setErrors({ ...errors, description: null });
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Timeline */}
                                    <div className="space-y-4">
                                        <label className="text-base font-semibold text-white">Timeline</label>
                                        <div className="flex flex-wrap gap-3">
                                            {timelines.map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setFormData({ ...formData, timeline: t })}
                                                    className={cn(
                                                        "px-5 py-2.5 rounded-full text-sm font-medium border transition-all",
                                                        formData.timeline === t
                                                            ? "bg-white text-black border-white shadow-lg shadow-white/10"
                                                            : "bg-transparent border-white/20 text-muted-foreground hover:border-white/40 hover:text-white"
                                                    )}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Budget */}
                                    <div className="space-y-4">
                                        <label className="text-base font-semibold text-white">Budget Range <span className="text-muted-foreground font-normal text-xs ml-2">(Optional)</span></label>
                                        <div className="flex flex-wrap gap-3">
                                            {budgets.map((b) => (
                                                <button
                                                    key={b}
                                                    onClick={() => setFormData({ ...formData, budget: b })}
                                                    className={cn(
                                                        "px-5 py-2.5 rounded-full text-sm font-medium border transition-all",
                                                        formData.budget === b
                                                            ? "bg-green-500/20 text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                                            : "bg-transparent border-white/20 text-muted-foreground hover:border-white/40 hover:text-white"
                                                    )}
                                                >
                                                    {b}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end border-t border-white/5">
                                    <Button
                                        onClick={handleNext}
                                        className="h-14 px-10 text-lg bg-white text-black hover:bg-white/90 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-105"
                                    >
                                        Next Step <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: The Handshake */}
                        {step === 2 && (
                            <div className="space-y-10 animate-in slide-in-from-right-8 duration-500 fade-in">
                                <div>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-muted-foreground hover:text-white flex items-center text-sm mb-6 transition-colors group"
                                    >
                                        <div className="bg-white/10 p-1 rounded-full mr-2 group-hover:bg-white/20 transition-colors">
                                            <ArrowLeft className="w-4 h-4" />
                                        </div>
                                        Back to details
                                    </button>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Almost Done</h2>
                                    <p className="text-lg text-muted-foreground">Where should we send the proposal?</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-base font-semibold text-white/90">Your Name <span className="text-red-400">*</span></label>
                                            <Input
                                                required
                                                placeholder="John Doe"
                                                className="bg-white/5 border-white/10 h-14 text-lg px-6 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-base font-semibold text-white/90">Work Email <span className="text-red-400">*</span></label>
                                            <Input
                                                required
                                                type="email"
                                                placeholder="john@company.com"
                                                className="bg-white/5 border-white/10 h-14 text-lg px-6 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-base font-semibold text-white/90">WhatsApp <span className="text-muted-foreground/60 font-normal text-sm ml-2">(Optional - for faster reply)</span></label>
                                            <Input
                                                type="tel"
                                                placeholder="+91 98765 43210"
                                                className="bg-white/5 border-white/10 h-14 text-lg px-6 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
                                                value={formData.whatsapp}
                                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.01] rounded-2xl mt-4"
                                    >
                                        {loading ? <><Loader2 className="mr-3 w-6 h-6 animate-spin" /> Submitting Request...</> : "Request Project Review"}
                                    </Button>

                                    {/* Trust Microcopy */}
                                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs md:text-sm text-muted-foreground/70 pt-2 px-4 text-center">
                                        <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500/80" /> Free Consultation</span>
                                        <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500/80" /> No Obligation</span>
                                        <span className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500/80" /> 100% Confidential</span>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                ) : (
                    // Success State
                    <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-8 min-h-[600px] animate-in zoom-in duration-500">
                        <div className="h-28 w-28 bg-green-500/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-green-500/50 shadow-[0_0_60px_rgba(34,197,94,0.4)]">
                            <CheckCircle2 className="h-14 w-14 text-green-400" />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-4xl font-bold text-white">Project Request Received</h3>
                            <p className="text-green-400 font-bold tracking-widest text-sm uppercase bg-green-500/10 py-1 px-4 rounded-full inline-block border border-green-500/20">We're on it</p>
                        </div>

                        <p className="text-muted-foreground max-w-md mx-auto text-lg leading-relaxed">
                            Thanks for sharing the details, <span className="text-white font-semibold">{formData.name}</span>.<br />
                            We’ll review your project and reach out within 24 hours to discuss next steps.
                        </p>

                        <div className="flex flex-col gap-4 w-full max-w-sm pt-8">
                            <a
                                href="https://wa.me/917266914546"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full"
                            >
                                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold h-14 text-lg rounded-xl shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all">
                                    Chat on WhatsApp (Faster)
                                </Button>
                            </a>
                            <Button
                                variant="ghost"
                                className="w-full text-muted-foreground hover:text-white hover:bg-white/5"
                                onClick={() => setOpen(false)}
                            >
                                Back to Site
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

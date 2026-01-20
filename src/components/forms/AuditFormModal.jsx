import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Loader2, Globe, User, Mail, Sparkles } from "lucide-react";

export const AuditFormModal = ({ children }) => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        url: '',
        name: '',
        email: '',
        role: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "7caa3cbd-de74-417b-abe3-e3a593207388",
                    subject: `New Audit Request: ${formData.url}`,
                    from_name: "BrandIgnite Audit Form",
                    replyto: formData.email,
                    name: formData.name,
                    email: formData.email,
                    // Consolidate data into message to prevent duplicate field listing in email
                    message: `
                        -- AUDIT TARGET --
                        URL: ${formData.url}
                        
                        -- CONTACT INFO --
                        Name: ${formData.name}
                        Email: ${formData.email}
                    `
                }),
            });

            const result = await response.json();

            if (result.success) {
                setLoading(false);
                setStep(2);
            } else {
                alert("Something went wrong. Please try again.");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Error submitting form. Please try again.");
            setLoading(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setFormData({ url: '', name: '', email: '', role: '' });
    };

    return (
        <Dialog onOpenChange={(open) => !open && setTimeout(resetForm, 300)}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(var(--primary),0.25)]">
                {/* Decorative Elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none" />

                {step === 1 ? (
                    <div className="p-8 relative z-10">
                        <DialogHeader className="mb-0 text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mb-4">
                                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Free Analysis</span>
                            </div>
                            <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/70">
                                Unlock Your <br /> Website's Potential
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-base mt-2 leading-relaxed">
                                Get a comprehensive, data-driven audit of your SEO, performance, and conversion gaps—delivered to your inbox.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Website URL <span className="text-red-400">*</span></label>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <Input
                                        required
                                        type="url"
                                        placeholder="https://yourbrand.com"
                                        className="bg-white/5 border-white/10 h-12 pl-10 text-base focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Your Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <Input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="bg-white/5 border-white/10 h-11 pl-10 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground ml-1">Work Email <span className="text-red-400">*</span></label>
                                    <div className="relative group">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <Input
                                            required
                                            type="email"
                                            placeholder="john@company.com"
                                            className="bg-white/5 border-white/10 h-11 pl-10 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all placeholder:text-muted-foreground/50"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 transition-all duration-300 mt-2 rounded-xl"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Assets...
                                    </>
                                ) : (
                                    <>
                                        Generate Free Audit <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            <div className="text-center pt-2">
                                <p className="text-xs text-muted-foreground/50">
                                    100% Free & Confidential. No credit card required.
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 relative z-10 min-h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />

                        <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center mb-2 ring-1 ring-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] animate-in zoom-in duration-500">
                            <CheckCircle2 className="h-12 w-12 text-green-400 drop-shadow-md" />
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-white">Success!</h3>
                            <p className="text-green-400 font-medium tracking-wide uppdercase text-sm">Audit Request Confirmed</p>
                        </div>

                        <p className="text-muted-foreground max-w-sm mx-auto text-base leading-relaxed">
                            We've started analyzing <span className="text-white font-medium bg-white/10 px-2 py-0.5 rounded">{formData.url}</span>.
                            <br />
                            Your comprehensive report will be sent to <span className="text-white font-medium">{formData.email}</span> shortly.
                        </p>

                        <Button
                            className="mt-4 border-white/10 hover:bg-white/5 text-white"
                            variant="outline"
                            onClick={() => document.querySelector('[data-state="open"]')?.click()}
                        >
                            Return to Homepage
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

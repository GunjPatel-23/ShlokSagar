'use client'

import { useState } from 'react'
import { Send, Mail, Phone, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus('idle')
        setErrorMessage('')

        try {
            await api.contact.submit(formData)
            setSubmitStatus('success')
            setFormData({ name: '', email: '', phone: '', message: '' })
        } catch (error: any) {
            setSubmitStatus('error')
            setErrorMessage(error.message || 'Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div id="contact" className="py-16 scroll-mt-16">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Contact Us</CardTitle>
                    <CardDescription className="text-base">
                        Have a question or suggestion? We'd love to hear from you!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {submitStatus === 'success' ? (
                        <div className="text-center py-12">
                            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
                            <p className="text-muted-foreground mb-6">
                                Your message has been sent successfully. Our team will get back to you soon.
                            </p>
                            <Button onClick={() => setSubmitStatus('idle')}>
                                Send Another Message
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Name <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your full name"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your.email@example.com"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number (Optional)
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91 98765 43210"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message" className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Message <span className="text-destructive">*</span>
                                </Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="How can we help you?"
                                    rows={6}
                                    required
                                    disabled={isSubmitting}
                                    className="resize-none"
                                />
                            </div>

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                                    <p className="text-destructive text-sm">{errorMessage}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full"
                                size="lg"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Send Message
                                    </>
                                )}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                You can also reach us at{' '}
                                <a href="mailto:shloksagarofficial@gmail.com" className="text-primary hover:underline">
                                    shloksagarofficial@gmail.com
                                </a>
                            </p>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

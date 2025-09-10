import { ContactForm } from "@/components/contact-form"
import { Mail, MessageCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - ZaikaRoots",
  description:
    "Get in touch with the ZaikaRoots team. We'd love to hear your feedback, suggestions, or answer any questions about our recipe platform.",
  keywords: ["contact", "support", "feedback", "help", "ZaikaRoots"],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <MessageCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have feedback, suggestions, or just want to share your cooking
            adventures, we're here to listen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-sm text-muted-foreground">
                    For general questions about ZaikaRoots, recipe suggestions, or partnership opportunities.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Having trouble with the app? Need help with features? We're here to help you get cooking!
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Recipe Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your cooking experiences, recipe modifications, or suggest new cuisines to explore.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We typically respond to messages within 24-48 hours. For urgent technical issues, we aim to respond
                  even faster.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <a href="/about" className="text-primary hover:underline">
                      Learn more about ZaikaRoots
                    </a>
                  </div>
                  <div>
                    <a href="/search" className="text-primary hover:underline">
                      Search for recipes
                    </a>
                  </div>
                  <div>
                    <a href="/categories" className="text-primary hover:underline">
                      Browse cuisines
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://spoonacular.com/food-api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Spoonacular API
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

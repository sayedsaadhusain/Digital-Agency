import React, { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const posts = [
  {
    title: "The Future of Web Development: Trends to Watch",
    excerpt: "Explore the latest trends shaping the future of web development and stay ahead of the curve.",
    content: `Web development is constantly evolving, with new technologies and methodologies emerging regularly. 
    This article explores key trends that are shaping the future of web development, including:
    
    1. Progressive Web Apps (PWAs)
    2. JAMstack Architecture
    3. Serverless Computing
    4. AI and Machine Learning Integration
    5. WebAssembly
    
    Understanding these trends is crucial for developers and businesses looking to stay competitive in the digital landscape.`,
    date: "2025-04-01",
    author: "Sayed Saad",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80"
  },
  {
    title: "Why UX Design Matters More Than Ever",
    excerpt: "Dive into the significance of user experience design and how it impacts modern digital products.",
    content: `In an increasingly competitive market, user experience (UX) design plays a pivotal role in determining the success of a digital product.
    This article covers:
    
    1. Core principles of UX design
    2. How good UX increases customer retention
    3. Examples of successful UX implementations
    4. Tools and strategies for improving UX
    
    Delivering an exceptional user experience is no longer optional; it’s essential for brand loyalty and business growth.`,
    date: "2025-04-05",
    author: "Sayed Saad",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=800&q=80"
  },
  {
    title: "A Beginner's Guide to API Integration",
    excerpt: "Learn how APIs work and how you can integrate them into your projects to unlock powerful features.",
    content: `APIs (Application Programming Interfaces) allow different software systems to communicate and share data seamlessly. 
    This guide explains:
    
    1. What APIs are and why they matter
    2. Common types of APIs (REST, GraphQL, SOAP)
    3. How to authenticate and consume APIs
    4. Best practices for secure API integration
    
    Mastering API integration is crucial for modern developers aiming to build feature-rich and scalable applications.`,
    date: "2025-04-10",
    author: "Sayed Saad",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
  }
]

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">
            Stay updated with our latest thoughts on technology, design, and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border">
                  Tech Trends
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <span className="text-primary text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-xl border-border p-0 overflow-hidden">
          {selectedPost && (
            <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 w-full">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="p-8">
                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(selectedPost.date).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {selectedPost.readTime}</span>
                    <span className="flex items-center gap-1"><User className="h-4 w-4" /> {selectedPost.author}</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold gradient-text leading-tight">
                    {selectedPost.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="prose prose-invert max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-loose text-lg">
                    {selectedPost.content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export { Blog }

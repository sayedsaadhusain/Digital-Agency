import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, User, Clock, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate read time
  const getReadTime = (content) => {
    const wordsPerMinute = 200;
    const text = content || ""; // content might be null
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes) + " min read";
  }

  const getAuthorName = (post) => {
    // In a real app you might join with profiles table, for now hardcode or use a field if exists
    return "Sayed Saad";
  }

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

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-card/50 rounded-2xl border border-border">
            <p className="text-muted-foreground">No recent posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col group cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-56 overflow-hidden bg-muted">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Cover Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  {post.category && (
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border">
                      {post.category}
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getReadTime(post.content)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3 text-sm flex-grow">
                    {post.excerpt || post.content?.substring(0, 150) + "..."}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{getAuthorName(post)}</span>
                    </div>
                    <span className="text-primary text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-xl border-border p-0 overflow-hidden">
          {selectedPost && (
            <div className="flex flex-col h-full max-h-[90vh] overflow-y-auto">
              <div className="relative h-64 w-full bg-muted">
                {selectedPost.cover_image && (
                  <img
                    src={selectedPost.cover_image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="p-8">
                <DialogHeader className="mb-6 text-left">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(selectedPost.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {getReadTime(selectedPost.content)}</span>
                    <span className="flex items-center gap-1"><User className="h-4 w-4" /> {getAuthorName(selectedPost)}</span>
                  </div>
                  <DialogTitle className="text-3xl font-bold gradient-text leading-tight">
                    {selectedPost.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="prose prose-invert max-w-none">
                  {/* In a real app we'd use a markdown parser or HTML dangerousSetInnerHTML (sanitized) */}
                  <div className="text-muted-foreground leading-loose text-lg" dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
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

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Share2, Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorName: string;
  category?: string;
  tags?: string[];
  publishedAt?: Timestamp;
  createdAt: Timestamp;
}

export default function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}! (Dummy action)`);
      setEmail('');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post?.title || '')}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#111] dark:border-white"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black uppercase mb-4 text-[#111] dark:text-white">Post Not Found</h1>
        <p className="text-[#666] dark:text-zinc-400 mb-8 font-medium">The article you are looking for does not exist or has been removed.</p>
        <Link to="/blog" className="px-8 py-4 bg-[#111] text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-sm inline-flex hover:scale-105 transition-transform">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Calculate reading time (roughly 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="min-h-screen pb-32">
      {/* Hero Header */}
      <header className="pt-24 px-6 md:px-12 max-w-5xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#FA1594] transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to all posts
        </Link>
        
        {post.category && (
          <div className="text-[10px] font-black uppercase tracking-widest text-[#FA1594] mb-6">
            [{post.category}]
          </div>
        )}
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-[#111] dark:text-white">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-widest border-t border-b border-gray-200 dark:border-zinc-800 py-6 mb-12 relative">
          <div className="flex items-center gap-3 text-black dark:text-white">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
              {post.authorName.charAt(0).toUpperCase()}
            </div>
            By {post.authorName}
          </div>
          <div className="hidden sm:block text-gray-300 dark:text-zinc-700">•</div>
          <div>{post.publishedAt ? format(post.publishedAt.toDate(), 'MMMM d, yyyy') : format(post.createdAt.toDate(), 'MMMM d, yyyy')}</div>
          <div className="hidden sm:block text-gray-300 dark:text-zinc-700">•</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {readingTime} min read</div>
          
          <div className="ml-auto relative">
             <button 
               onClick={() => setShowShareMenu(!showShareMenu)}
               className="flex items-center gap-2 hover:text-[#FA1594] transition-colors"
             >
               <Share2 className="w-4 h-4" />
               <span className="hidden sm:inline">Share</span>
             </button>
             
             {showShareMenu && (
               <div className="absolute right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-xl overflow-hidden z-20 min-w-[200px] flex flex-col font-sans normal-case tracking-normal">
                  <button onClick={shareToTwitter} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors">
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" /> Share on Twitter
                  </button>
                  <button onClick={shareToFacebook} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors border-t border-gray-100 dark:border-zinc-800">
                    <Facebook className="w-4 h-4 text-[#4267B2]" /> Share on Facebook
                  </button>
                  <button onClick={copyLink} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 text-left transition-colors border-t border-gray-100 dark:border-zinc-800">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />} 
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
               </div>
             )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto px-6 mb-20"
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-gray-100 dark:bg-zinc-900 shadow-2xl relative">
            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 font-medium relative">
        {/* Decorative elements for blog */}
        <div className="absolute left-[-40px] top-[10%] hidden xl:flex flex-col gap-4 text-gray-300 dark:text-zinc-700">
          <button onClick={shareToTwitter} className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg hover:text-[#1DA1F2] transition-colors"><Twitter className="w-5 h-5"/></button>
          <button onClick={shareToFacebook} className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg hover:text-[#4267B2] transition-colors"><Facebook className="w-5 h-5"/></button>
          <button onClick={copyLink} className="p-3 bg-white dark:bg-zinc-900 rounded-full shadow-lg hover:text-[#FA1594] transition-colors">
            {copied ? <Check className="w-5 h-5 text-green-500"/> : <LinkIcon className="w-5 h-5"/>}
          </button>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-[#FA1594] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none prose-p:leading-relaxed">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>

      {/* Tags & Call to Action */}
      <div className="max-w-3xl mx-auto px-6 mt-20 pt-12 border-t border-gray-200 dark:border-zinc-800">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-20">
            {post.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-zinc-900 text-[10px] font-bold uppercase tracking-widest rounded-full text-gray-600 dark:text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-900 dark:to-[#1a1025] rounded-3xl p-10 md:p-12 mb-16 border border-indigo-100 dark:border-purple-900/30 text-center shadow-lg">
          <h3 className="text-3xl font-black uppercase tracking-tighter mb-3 text-[#111] dark:text-white">Never miss an update</h3>
          <p className="text-gray-600 dark:text-zinc-400 font-medium mb-8">Get our latest strategies, AI insights, and trading tools sent straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR BEST EMAIL" 
              required
              className="flex-grow bg-white dark:bg-black/50 border border-gray-300 dark:border-zinc-700 rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-[#FA1594] transition-colors"
            />
            <button type="submit" className="px-8 py-4 bg-[#111] dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

        {/* Call to action for digital products */}
        <div className="bg-[#111] dark:bg-zinc-900 text-white rounded-3xl p-10 md:p-16 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FA1594] via-[#229ED9] to-[#FA1594] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[length:200%_auto] animate-gradient" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 relative z-10">Level up today</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto font-medium relative z-10">Unlock exclusive digital products, premium EAs, and join a community of forward-thinkers.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
             <a href="https://payhip.com/midzerohub" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#FA1594] hover:bg-[#FF3BA6] text-white rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-lg hover:shadow-xl">
               Explore Market
             </a>
             <a href="https://t.me/+1vH_j9h-myowZjQ0" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm transition-colors backdrop-blur-md">
               Join Telegram
             </a>
          </div>
        </div>
      </div>
    </article>
  );
}

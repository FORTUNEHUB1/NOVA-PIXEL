import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, where, getFirestore, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  featuredImage?: string;
  authorName: string;
  category?: string;
  tags?: string[];
  publishedAt?: Timestamp;
  createdAt: Timestamp;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'blogPosts');
        // Get all published posts, ordered by date
        const q = query(postsRef, where('isPublished', '==', true), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedPosts: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category).filter((c): c is string => !!c)))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Our Blog</h1>
        <p className="text-xl text-[#666] dark:text-zinc-400 max-w-2xl mx-auto font-medium">
          Insights, thoughts, and updates on digital products, trading, and AI.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                selectedCategory === category 
                  ? 'bg-[#111] text-white dark:bg-white dark:text-black' 
                  : 'border border-gray-300 dark:border-zinc-700 hover:border-[#111] dark:hover:border-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-md rounded-full border border-white/30 dark:border-zinc-700/50 shadow-lg focus-within:shadow-[0_0_20px_rgba(0,255,102,0.3)] transition-all">
          <input
            type="text"
            placeholder="SEARCH..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none rounded-full px-5 py-3 pl-12 text-sm uppercase tracking-widest font-bold focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-zinc-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#111] dark:border-white"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 font-bold uppercase tracking-widest">
          No posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                {post.featuredImage ? (
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-700">No Image</div>
                )}
                {post.category && (
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </div>
                )}
              </Link>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 mb-3 tracking-widest uppercase">
                  {post.publishedAt ? format(post.publishedAt.toDate(), 'MMMM d, yyyy') : format(post.createdAt.toDate(), 'MMMM d, yyyy')} • By {post.authorName}
                </p>
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-3 group-hover:text-[#FA1594] transition-colors">{post.title}</h2>
                </Link>
                <p className="text-gray-600 dark:text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="mt-auto text-xs font-bold uppercase tracking-widest border-b-2 border-[#111] dark:border-white pb-1 inline-flex self-start group-hover:border-[#FA1594] transition-colors">
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

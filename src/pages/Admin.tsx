import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Trash2, Edit3, Plus, Eye, X, Image as ImageIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface AdminProps {
  user: User | null;
  isAuthLoading?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorName: string;
  authorId: string;
  category?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function Admin({ user, isAuthLoading = false }: AdminProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, [user, isAuthLoading]);

  const checkAdminStatus = async () => {
    if (isAuthLoading) {
      return;
    }
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    
    // Check if hardcoded owner
    if (user.email === 'kemboifortune98@gmail.com') {
      setIsAdmin(true);
      fetchPosts();
      return;
    }

    // Check database role
    try {
      const { getDoc, doc } = await import('firebase/firestore');
      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      if (adminDoc.exists()) {
        setIsAdmin(true);
        fetchPosts();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    } catch (e) {
      console.error("Failed to verify admin status", e);
      setIsAdmin(false);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      setPosts(fetched);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 800; // Resize to max width to fit in Firestore 1MB limits
          const MAX_HEIGHT = 800;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            setFeaturedImage(dataUrl);
          } else {
            setFeaturedImage(event.target?.result as string);
          }
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setContent('');
    setFeaturedImage('');
    setCategory('');
    setTags('');
    setIsPublished(false);
    setCurrentPost(null);
    setIsEditing(false);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt || '');
    setContent(post.content);
    setFeaturedImage(post.featuredImage || '');
    setCategory(post.category || '');
    setTags(post.tags?.join(', ') || '');
    setIsPublished(post.isPublished);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, 'blogPosts', id));
        fetchPosts();
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete. Error: " + error);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!title || !content) {
      alert("Title and content are required.");
      return;
    }

    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t !== '');
    const now = Timestamp.now();

    const postData: Partial<BlogPost> = {
      title,
      excerpt,
      content,
      featuredImage,
      category,
      tags: tagArray,
      isPublished,
      authorName: user.displayName || user.email?.split('@')[0] || 'Admin',
      authorId: user.uid,
      updatedAt: now,
    };

    if (isPublished && (!currentPost || !currentPost.isPublished)) {
       postData.publishedAt = now;
    }

    try {
      if (currentPost && currentPost.id) {
        // Update
        const docRef = doc(db, 'blogPosts', currentPost.id);
        await updateDoc(docRef, postData);
      } else {
        // Create
        postData.createdAt = now;
        if (isPublished) postData.publishedAt = now;
        await addDoc(collection(db, 'blogPosts'), postData);
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Failed to save post. Note: Only admins/owners can create posts. Verify Firebase rules.");
    }
  };

  if (isAuthLoading || (user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
         <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#111] dark:border-white"></div>
            Verifying Admin Status...
         </div>
      </div>
    );
  }

  if (!user || (!loading && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bg-white dark:bg-zinc-900 p-12 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800">
          <h2 className="text-3xl font-black uppercase text-[#111] dark:text-white">Admin Access Restricted</h2>
          <p className="mt-4 text-gray-500 font-medium mb-8">
            {!user ? "Please sign in to access the admin dashboard." : "Access Denied. You do not have administrator privileges."}
          </p>
          <a href="/login" className="px-8 py-4 bg-[#FA1594] text-white rounded-full font-black uppercase tracking-widest text-sm inline-block hover:scale-105 transition-transform">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 min-h-screen">
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-full px-4 py-2 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FA1594] to-[#229ED9] flex items-center justify-center text-white font-bold text-xs">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-widest text-[#111] dark:text-white leading-tight">
              {user?.displayName || 'Administrator'}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">
              {user?.email}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-gray-200 dark:border-zinc-800 pb-8 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#111] dark:text-white">Admin Dashboard</h1>
          <p className="text-sm font-bold uppercase tracking-widest text-[#FA1594] mt-2">Manage Blog Posts</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#111] text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-zinc-800"
        >
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
             <h2 className="text-2xl font-black uppercase tracking-tighter">{currentPost ? 'Edit Post' : 'Create New Post'}</h2>
             <button onClick={resetForm} className="text-gray-500 hover:text-[#111] dark:hover:text-white p-2 border border-gray-200 dark:border-zinc-700 rounded-full transition-colors">
               <X className="w-5 h-5" />
             </button>
          </div>
          <form onSubmit={handleSave} className="space-y-8 font-sans">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title *</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required
                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-medium text-lg focus:outline-none focus:border-[#FA1594] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                  placeholder="e.g. Trading, AI, Mindset"
                  className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FA1594] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Tags (comma separated)</label>
                <input 
                  type="text" 
                  value={tags} 
                  onChange={e => setTags(e.target.value)} 
                  placeholder="e.g. ea-bot, web-dev"
                  className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FA1594] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Featured Image</label>
              <div className="flex flex-col gap-4">
                {featuredImage && (
                  <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-zinc-800">
                    <img src={featuredImage} alt="Featured preview" className="w-full h-auto object-cover" />
                    <button 
                      type="button"
                      onClick={() => setFeaturedImage('')}
                      className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-black/80 transition-colors backdrop-blur-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:border-[#FA1594] dark:hover:border-[#FA1594] transition-colors group text-sm font-semibold text-gray-600 dark:text-zinc-300">
                    <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#FA1594] transition-colors" />
                    <span>Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                  <span className="text-xs text-gray-400 font-medium">or</span>
                  <input 
                    type="url" 
                    value={featuredImage.startsWith('data:') ? '' : featuredImage} 
                    onChange={e => setFeaturedImage(e.target.value)} 
                    placeholder="Paste image URL..."
                    className="flex-1 bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FA1594] transition-colors min-w-0"
                  />
                </div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Max file size: 5MB. Images will be automatically optimized. Format: JPG, PNG, WEBP.</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Excerpt</label>
              <textarea 
                value={excerpt} 
                onChange={e => setExcerpt(e.target.value)} 
                rows={2}
                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-[#FA1594] transition-colors resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 flex justify-between">
                <span>Content (Markdown format) *</span>
                <span className="text-gray-400 font-normal normal-case">Supports **bold**, *italic*, # Headings, [links]()</span>
              </label>
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                rows={15}
                required
                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#111] dark:focus:border-white transition-colors"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 py-4 border-t border-gray-200 dark:border-zinc-800">
              <input 
                type="checkbox" 
                id="isPublished" 
                checked={isPublished} 
                onChange={e => setIsPublished(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-[#FA1594] focus:ring-[#FA1594]"
              />
              <label htmlFor="isPublished" className="text-sm font-bold uppercase tracking-widest cursor-pointer select-none">Publish immediately</label>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 dark:border-zinc-700 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-[#FA1594] text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#FF3BA6] transition-all transform hover:scale-105"
              >
                {currentPost ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-zinc-800">
          {loading ? (
             <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#111] dark:border-white"></div>
                Loading posts...
             </div>
          ) : posts.length === 0 ? (
             <div className="p-12 text-center text-gray-500 font-bold uppercase tracking-widest">
               No posts found.
             </div>
          ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left font-sans">
                   <thead className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-200 dark:border-zinc-800 text-[10px] uppercase font-black tracking-[0.2em] text-gray-500">
                      <tr>
                         <th className="p-6">Title</th>
                         <th className="p-6">Status</th>
                         <th className="p-6">Date</th>
                         <th className="p-6 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100 dark:divide-zinc-800/50 text-sm">
                      {posts.map(post => (
                         <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <td className="p-6">
                               <div className="font-bold text-[#111] dark:text-white line-clamp-1">{post.title}</div>
                               <div className="text-gray-500 text-xs mt-1">{post.category || 'Uncategorized'}</div>
                            </td>
                            <td className="p-6">
                               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${post.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                  {post.isPublished ? 'Published' : 'Draft'}
                               </span>
                            </td>
                            <td className="p-6 text-gray-500">
                               {format(post.createdAt.toDate(), 'MMM d, yyyy')}
                            </td>
                            <td className="p-6">
                               <div className="flex justify-end gap-3">
                                  {post.isPublished && (
                                    <a href={`/blog/${post.id}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-[#229ED9] transition-colors rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20" title="View">
                                       <Eye className="w-4 h-4" />
                                    </a>
                                  )}
                                  <button onClick={() => handleEdit(post)} className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800" title="Edit">
                                     <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

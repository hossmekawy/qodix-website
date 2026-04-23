'use client';

import { useState } from 'react';
import { submitComment } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

interface CommentsSectionProps {
  postId: number;
  initialComments: Comment[];
}

export default function CommentsSection({ postId, initialComments }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setStatus('submitting');
    try {
      const newComment = await submitComment({
        post: postId,
        name,
        text
      });
      // Prepend the new comment so it appears at the top
      setComments([newComment, ...comments]);
      setName('');
      setText('');
      setStatus('idle');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="border-t border-black/10 pt-16 mt-16">
      <h3 className="text-3xl font-bold mb-10 tracking-tight">Comments ({comments.length})</h3>

      <form onSubmit={handleSubmit} className="mb-16 bg-black/5 p-6 md:p-8 rounded-2xl">
        <h4 className="font-bold mb-6 text-lg">Leave a comment</h4>
        <div className="space-y-4">
          <div>
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full md:w-1/2 bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors"
            />
          </div>
          <div>
            <textarea 
              required
              placeholder="Share your thoughts..." 
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>
          
          {status === 'error' && (
            <p className="text-red-500 text-sm">Failed to post comment. Please try again.</p>
          )}

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-black/80 transition-colors flex items-center gap-2"
          >
            {status === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-black/10 pb-8 last:border-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center font-bold text-black">
                {comment.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-bold">{comment.name}</p>
                <p className="text-xs text-black/50">{new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString()}</p>
              </div>
            </div>
            <p className="text-black/80 leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart, FaRegComment, FaShare, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface PostCardProps {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link: string;
}

const PostCard = ({ id, title, des, img, iconLists, link }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 50);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="social-glass rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group mb-4 md:mb-8"
    >
      {/* Post Header */}
      <div className="p-4 md:p-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white border border-white/10 overflow-hidden">
             <Image 
                src="/image/arun.png" 
                alt="Arun" 
                width={40} 
                height={40} 
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
             />
             <span>AA</span>
          </div>
          <div>
            <h3 className="text-sm font-bold font-grotesk text-white leading-none mb-1">Arun Acharya</h3>
            <p className="text-[10px] text-white/40 font-grotesk uppercase tracking-widest font-bold">Project Post &bull; 2h ago</p>
          </div>
        </div>
        <div className="flex gap-2">
           {iconLists.slice(0,3).map((icon, i) => (
             <div key={i} className="w-6 h-6 rounded-full glass border border-white/5 p-1 flex items-center justify-center">
                <Image src={icon} alt="tech" width={16} height={16} />
             </div>
           ))}
        </div>
      </div>

      {/* Post Content: Image */}
      <div className="relative aspect-[16/9] overflow-hidden group-hover:cursor-pointer">
        <Image 
          src={img} 
          alt={title} 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
           <h4 className="text-2xl font-bold font-grotesk text-white tracking-tight">{title}</h4>
        </div>
      </div>

      {/* Caption / Description */}
      <div className="p-4 md:p-6">
        <p className="text-xs md:text-sm text-white/70 leading-relaxed font-sans mb-4 md:mb-6">
          <span className="font-bold text-white mr-2">arun_acharya</span>
          {des}
        </p>
        
        {/* Interaction Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 text-xl transition-colors ${liked ? "text-pink-500" : "text-white/40 hover:text-pink-400"}`}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span className="text-xs font-bold font-grotesk">{likes}</span>
            </button>
            <button className="flex items-center gap-2 text-xl text-white/40 hover:text-indigo-400 transition-colors">
              <FaRegComment />
              <span className="text-xs font-bold font-grotesk">{Math.floor(likes/3)}</span>
            </button>
            <button className="text-xl text-white/40 hover:text-green-400 transition-colors">
              <FaShare />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
             <a href={link} target="_blank" rel="noopener" className="text-white/40 hover:text-white transition-colors text-lg">
                <FaExternalLinkAlt />
             </a>
             <a href="#" className="text-white/40 hover:text-white transition-colors text-xl">
                <FaGithub />
             </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;

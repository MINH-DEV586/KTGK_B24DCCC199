import React from "react";
import type { Post } from "../types/post";

import { useNavigate } from "react-router-dom";
import { useCuaHangBaiViet } from "../stores/cuaHangBaiViet";

export default function PostCard({ post }: { post: Post }) {
  const nav = useNavigate();
  const { xoaBai } = useCuaHangBaiViet();

  const moTa = post.content.length > 100 ? post.content.slice(0, 100) + '...' : post.content;

  return (
    <div className="card">
      <img src={post.thumbnail} alt={post.title} className="thumb" />
      <h3>{post.title}</h3>
      <div className="small">{post.author} • {post.date} • {post.category}</div>
      <p className="small">{moTa}</p>
      <div className="controls">
        <button className="btn" onClick={() => nav(`/posts/${post.id}`)}>Đọc thêm</button>
        <button className="btn btn-primary" onClick={() => nav(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>
        <button className="btn btn-danger" onClick={() => {
          if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
            xoaBai(post.id);
            alert('Đã xóa bài viết');
          }
        }}>Xóa</button>
      </div>
    </div>
  );
}

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCuaHangBaiViet } from "../stores/cuaHangBaiViet";

export default function PostDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { layBaiTheoId, xoaBai } = useCuaHangBaiViet();
  const bai = id ? layBaiTheoId(Number(id)) : undefined;

  if (!bai) {
    return <div><h3>Không tìm thấy bài viết</h3><button className="btn" onClick={() => nav('/posts')}>Quay lại</button></div>;
  }

  return (
    <div>
      <h2>{bai.title}</h2>
      <div className="small">{bai.author} • {bai.date} • {bai.category}</div>
      <img src={bai.thumbnail} alt={bai.title} style={{width:'100%',maxHeight:400,objectFit:'cover',borderRadius:8,marginTop:12}}/>
      <p style={{whiteSpace:'pre-wrap',marginTop:12}}>{bai.content}</p>

      <div style={{display:'flex',gap:8,marginTop:12}}>
        <button className="btn" onClick={() => nav('/posts')}>Quay lại</button>
        <button className="btn btn-primary" onClick={() => nav(`/posts/edit/${bai.id}`)}>Chỉnh sửa</button>
        <button className="btn btn-danger" onClick={() => {
          if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
            xoaBai(bai.id);
            alert('Đã xóa');
            nav('/posts');
          }
        }}>Xóa bài viết</button>
      </div>
    </div>
  );
}

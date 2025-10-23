import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useCuaHangBaiViet } from "../stores/cuaHangBaiViet";

export default function EditPost() {
  const { id } = useParams();
  const nav = useNavigate();
  const { layBaiTheoId, capNhatBai } = useCuaHangBaiViet();

  if (!id) return <div>Id không hợp lệ</div>;
  const bai = layBaiTheoId(Number(id));
  if (!bai) return <div>Không tìm thấy bài viết</div>;

  return (
    <div>
      <h2>Chỉnh sửa bài viết</h2>
      <PostForm
        initial={bai}
        onCancel={() => nav(`/posts/${bai.id}`)}
        onSubmit={(payload) => {
          capNhatBai(bai.id, payload);
          alert('Cập nhật thành công!');
          nav(`/posts/${bai.id}`);
        }}
        submitLabel="Cập nhật"
      />
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { useCuaHangBaiViet } from "../stores/cuaHangBaiViet";

export default function CreatePost() {
  const { themBai } = useCuaHangBaiViet();
  const nav = useNavigate();

  return (
    <div>
      <h2>Viết bài mới</h2>
      <PostForm
        cheDo="them"
        themBai={(payload) => {
          
          alert("Đăng bài thành công!");
          nav("/posts");
        }}
      />
    </div>
  );
}

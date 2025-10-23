import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BaiViet {
  id: number;
  tieuDe: string;
  tacGia: string;
  ngay: string;
  danhMuc: string;
  moTa: string;
  anh: string;
}

const PostList: React.FC = () => {
  const [danhSach, setDanhSach] = useState<BaiViet[]>([
    {
      id: 1,
      tieuDe: "Công nghệ AI đang thay đổi thế giới",
      tacGia: "Nguyễn Văn A",
      ngay: "2025-10-10",
      danhMuc: "Công nghệ",
      moTa: "Trí tuệ nhân tạo (AI) đã và đang thay đổi nhiều lĩnh vực...",
      anh: "https://picsum.photos/300/200",
    },
    {
      id: 2,
      tieuDe: "Du lịch Đà Lạt cuối tuần",
      tacGia: "Lê Thị B",
      ngay: "2025-09-05",
      danhMuc: "Du lịch",
      moTa: "Đà Lạt mát mẻ, nhiều cảnh đẹp...",
      anh: "https://picsum.photos/301/200",
    },
  ]);

  const chuyen = useNavigate();
  const [tim, setTim] = useState("");

  const xoaBai = (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này không?")) {
      setDanhSach(danhSach.filter((b) => b.id !== id));
    }
  };

  const danhSachLoc = danhSach.filter((b) =>
    b.tieuDe.toLowerCase().includes(tim.toLowerCase())
  );

  return (
    <div style={{ padding: "15px" }}>
      <h2>Danh sách bài viết ({danhSachLoc.length})</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Tìm theo tiêu đề..."
          value={tim}
          onChange={(e) => setTim(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        />
        <button
          onClick={() => chuyen("/create")}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Viết bài mới
        </button>
      </div>

      <div>
        {danhSachLoc.map((b) => (
          <div
            key={b.id}
            style={{
              border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <img src={b.anh} alt={b.tieuDe} width="200" />
            <h3>{b.tieuDe}</h3>
            <p>
              {b.tacGia} - {b.ngay} - {b.danhMuc}
            </p>
            <p>{b.moTa}</p>
            <div>
              <button onClick={() => chuyen(`/posts/${b.id}`)}>Đọc thêm</button>
              <button onClick={() => chuyen(`/posts/edit/${b.id}`)}>Chỉnh sửa</button>
              <button onClick={() => xoaBai(b.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

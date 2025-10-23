import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BaiViet {
  id?: number;
  tieuDe: string;
  tacGia: string;
  anh: string;
  noiDung: string;
  theLoai: string;
  ngay?: string;
}

interface Props {
  themBai?: (bai: BaiViet) => void;
  capNhatBai?: (bai: BaiViet) => void;
  duLieu?: BaiViet;
  cheDo?: "them" | "sua";
}

const PostForm: React.FC<Props> = ({ themBai, capNhatBai, duLieu, cheDo }) => {
  const [bai, setBai] = useState<BaiViet>(
    duLieu || {
      tieuDe: "",
      tacGia: "",
      anh: "",
      noiDung: "",
      theLoai: "Khác",
    }
  );

  const dieuHuong = useNavigate();

  const xuLyThayDoi = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setBai({ ...bai, [e.target.name]: e.target.value });
  };

  const xuLyLuu = (e: React.FormEvent) => {
    e.preventDefault();

    if (bai.tieuDe.trim().length < 10) {
      alert("Tiêu đề phải ít nhất 10 ký tự!");
      return;
    }
    if (bai.tacGia.trim().length < 3) {
      alert("Tên tác giả phải ít nhất 3 ký tự!");
      return;
    }
    if (bai.noiDung.trim().length < 50) {
      alert("Nội dung phải ít nhất 50 ký tự!");
      return;
    }

    const baiMoi = {
      ...bai,
      ngay: new Date().toISOString().split("T")[0],
    };

    if (cheDo === "them" && themBai) {
      themBai(baiMoi);
      alert("Đăng bài thành công!");
      dieuHuong("/");
    } else if (cheDo === "sua" && capNhatBai) {
      capNhatBai(baiMoi);
      alert("Cập nhật thành công!");
      dieuHuong(`/posts/${bai.id}`);
    }
  };

  return (
    <div style={{ padding: "15px" }}>
      <h2>{cheDo === "sua" ? "Chỉnh sửa bài viết" : "Viết bài mới"}</h2>

      <form onSubmit={xuLyLuu}>
        <div>
          <label>Tiêu đề</label>
          <br />
          <input
            type="text"
            name="tieuDe"
            value={bai.tieuDe}
            onChange={xuLyThayDoi}
            style={{ width: "400px", marginBottom: "8px" }}
          />
        </div>

        <div>
          <label>Tác giả</label>
          <br />
          <input
            type="text"
            name="tacGia"
            value={bai.tacGia}
            onChange={xuLyThayDoi}
            style={{ width: "400px", marginBottom: "8px" }}
          />
        </div>

        <div>
          <label>URL ảnh thumbnail</label>
          <br />
          <input
            type="text"
            name="anh"
            value={bai.anh}
            onChange={xuLyThayDoi}
            placeholder="https://..."
            style={{ width: "400px", marginBottom: "8px" }}
          />
        </div>

        <div>
          <label>Thể loại</label>
          <br />
          <select
            name="theLoai"
            value={bai.theLoai}
            onChange={xuLyThayDoi}
            style={{ width: "200px", marginBottom: "8px" }}
          >
            <option>Công nghệ</option>
            <option>Du lịch</option>
            <option>Ẩm thực</option>
            <option>Đời sống</option>
            <option>Khác</option>
          </select>
        </div>

        <div>
          <label>Nội dung</label>
          <br />
          <textarea
            name="noiDung"
            value={bai.noiDung}
            onChange={xuLyThayDoi}
            rows={10}
            cols={60}
          ></textarea>
        </div>

        <br />
        <button type="submit">Đăng bài</button>
        <button
          type="button"
          onClick={() => dieuHuong("/")}
          style={{ marginLeft: "10px" }}
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default PostForm;

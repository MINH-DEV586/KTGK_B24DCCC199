import React, { createContext, useContext, useState } from "react";
import type { Post } from "../types/post";

import { duLieuBanDau } from "../data/duLieuBanDau";

type ContextType = {
  danhSach: Post[];
  themBai: (payload: Omit<Post, 'id' | 'date'>) => void;
  xoaBai: (id: number) => void;
  capNhatBai: (id: number, payload: Partial<Post>) => void;
  layBaiTheoId: (id: number) => Post | undefined;
};

const Context = createContext<ContextType | undefined>(undefined);

export const CuaHangBaiViet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [danhSach, setDanhSach] = useState<Post[]>(duLieuBanDau);

  const themBai = (payload: Omit<Post, 'id' | 'date'>) => {
    const newId = danhSach.length ? Math.max(...danhSach.map(p => p.id)) + 1 : 1;
    const today = new Date().toISOString().slice(0, 10);
    const moi: Post = { id: newId, date: today, ...payload };
    setDanhSach(prev => [moi, ...prev]);
  };

  const xoaBai = (id: number) => {
    setDanhSach(prev => prev.filter(p => p.id !== id));
  };

  const capNhatBai = (id: number, payload: Partial<Post>) => {
    setDanhSach(prev => prev.map(p => p.id === id ? { ...p, ...payload } : p));
  };

  const layBaiTheoId = (id: number) => danhSach.find(p => p.id === id);

  return (
    <Context.Provider value={{ danhSach, themBai, xoaBai, capNhatBai, layBaiTheoId }}>
      {children}
    </Context.Provider>
  );
};

export const useCuaHangBaiViet = () => {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useCuaHangBaiViet phải được dùng trong CuaHangBaiViet");
  return ctx;
};

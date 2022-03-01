import React from "react";

export type CustomButtonTypeProps = {
  customFontSize?: string;
  title?: string;
  isDisabled?: boolean,
  onclick?: () => void;
  isloading?: boolean;
};

export type inputProps = {
  title?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  size?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type inputPasswordProps = {
  onClick?: () => void;
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type inputTextAreaProps = {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type inputSelectProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: {id:number, name:string}[];
};

export type userData = {
  avatar: string;
  name: string;
  id: number;
  email: string;
  phone: string;
};

export type userHistory = {
  id: number | undefined;
  user_name: string | undefined;
  request_date: string | Date;
  status: string | undefined;
}

export type modalProps = {
  isOpen:boolean
  onClose:()=>void
}

export type addAssets = {
  role?: number;
  // isOpen: boolean;
  // onClose: () => void;
  // onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  // onChangeDeskripsi : (e: React.ChangeEvent<HTMLInputElement>) => void
  // onChangeKategori :(e: React.ChangeEvent<HTMLSelectElement>) => void
  // onChangeJumlah :(e: React.ChangeEvent<HTMLInputElement>) => void
  // onChangeImage :(e: React.ChangeEvent<HTMLInputElement>) => void
  isOpen:boolean;
  onClose:()=>void | undefined;
  nama?: string | undefined;
  total_aset?: number | undefined;
  kategori?: string | undefined;
  deskripsi?: string | undefined;
  backgroundimage?: string | undefined;
  category?: string | undefined;
  asset_name?: string | undefined;
  asset_image?: string | undefined;
  users?: userHistory[] | null | undefined;
  onChangeUpdate?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickUpdate?: () => void;
}

export type history = {
  category: string | undefined;
  asset_name: string | undefined;
  asset_image: string | undefined;
  users: userHistory[] | null | undefined;
}

export type CardDetailProps = {
  backgroundImage: string;
  kategori: string;
  name: string;
  deskripsi: string;
  pengguna: number;
  stok: number;
  onClick?: () => void;
}
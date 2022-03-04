import React from "react";

export type CustomButtonTypeProps = {
  customFontSize?: string;
  title?: string;
  isDisabled?: boolean;
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
  data?: { id: number; name: string }[];
};

export type inputSelectDataProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: { short_name: string; name: string }[];
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
};

export type modalProps = {
  isOpen:boolean
  onClose:()=>void
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

export type addAssets = {
  role?: number;
  isOpen: boolean;
  onClose: () => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDeskripsi: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeKategori: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeJumlah: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMaintained: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickAdd: () => void;
};

export type history = {
  category: string | undefined;
  asset_name: string | undefined;
  asset_image: string | undefined;
  users: userHistory[] | null | undefined;
};

export type CardDetailProps = {
  backgroundImage: string;
  kategori: string;
  name: string;
  deskripsi: string;
  pengguna: number;
  stok: number;
  onClick?: () => void;
};

export type typeActivitiesData = {
  activitiesType: string;
  asset_name: string;
  asset_image: string;
  id: number;
  request_date: string;
  status: string;
};

export type getAllAssets = {
  category: string;
  description: string;
  image: string;
  name: string;
  short_name: string;
  stock_available: number;
  user_count: number;
};

type assetData = {
  category: string;
  category_id: number;
  code: string;
  id: number;
  image: string;
  name: string;
  short_name: string;
};

type userDataRequest = {
  address: string;
  avater: string;
  created_at: string;
  deleted_at: string;
  division: string;
  email: string;
  gender: string;
  id: number;
  name: string;
  password: string;
  phone: string;
  role: string;
  updated_at: string;
};

export type tableRequest = {
  Asset: assetData;
  User: userDataRequest;
  activity: string;
  deleted_at: string;
  description: string;
  id: number;
  request_time: string;
  return_time: string;
  status: string;
  updated_at: string;
};

export type activitiesDetail = {
  activity: string;
  asset_image: string;
  asset_name: string;
  category: string;
  description: string;
  id: number;
  request_date: string;
  return_date: string;
  status: string;
  stock_left: string;
  user_name: string;
};

export type requestModalProps = {
  handleToManager?: () => void;
  handleAcceptReqManager?: () => void;
  handleAcceptReqAdmin?: () => void;
  handleRejectReqEmployee?: ()=>void;
  handleReturnEmployee?: ()=>void;
  handleAjukanPengembalian?: ()=>void;
  dataActivities?: activitiesDetail;
  data?: tableRequest;
  role: number;
  status: string;
  isOpen: boolean;
  onClose: () => void;
};

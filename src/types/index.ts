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
  width?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
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

type searchData = {
  id: number;
  name: string;
  value: string;
};

export type searchProps = {
  data: searchData[];
  value: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type inputSelectStatusProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  size?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: searchData[];
  isDisabled?: boolean;
};

export type detailAdminProps = {
  nama: string | undefined;
  total_aset: number | undefined;
  deskripsi: string | undefined;
  kategori: string | undefined;
  backgroundImage?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type detailEmployeeProps = {
  nama: string | undefined;
  total_aset: number | undefined;
  deskripsi: string | undefined;
  kategori: string | undefined;
  backgroundImage?: string | undefined;
}

export type inputSelectProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: { id: number; name: string; }[];
  isDisabled?: boolean;
};

export type inputSelectDataProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: { short_name: string; name: string }[];
};

export type inputSelectDataUserProps = {
  title?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  data?: { id: number; user: string }[];
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
  activity_type: string;
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
export type tableProcure = {
  User: userDataRequest;
  category: string;
  image: string;
  activity: string;
  deleted_at: string;
  description: string;
  id: number;
  request_time: string;
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
  handleRejectReqEmployee?: ()=>void;
  handleToManager?: () => void;
  handleAcceptReqManager?: () => void;
  handleRejectReqManager?:()=>void;
  handleAcceptReqAdmin?: () => void;
  handleReturnEmployee?: ()=>void;
  handleAjukanPengembalian?: ()=>void;
  handleAcceptReturn?: ()=>void;
  handleRejectReqAdmin?:()=> void;
  dataActivities?: activitiesDetail;
  data?: tableRequest;
  role: number;
  isOpen: boolean;
  onClose: () => void;
};

export type procureModalProps = {
  handleAcceptReqProcure?: () => void;
  handleRejectReqProcure?:()=>void;
  data?: tableProcure;
  role: number;
  isOpen: boolean;
  onClose: () => void;
};

export type historyModalProps = {
  dataHistory?: selectHistoryDataType;
  isOpen: boolean;
  onClose: () => void;
};

export type historyDataType = {
  activity_type: string
  asset_name: string
  asset_image: string
  category: string
  id: number
  request_date: string
}

export type selectHistoryDataType = {
  asset_name: string
  asset_image: string
  asset_short_name: string
  category: string
  description: string
  return_date:string
  status: string
  user_name: string
  stock_left: number
  id: number
  request_date: string
}

type userType = {
  id: number;
  name: string;
  avatar: string;
};

export type userContextType = {
  userData: userType;
  setUserData: React.Dispatch<React.SetStateAction<userType>>;
};

export type userContextProviderProps = {
  children: React.ReactNode;
};
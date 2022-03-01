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

export type modalProps = {
  isOpen:boolean
  onClose:()=>void
}

export type addAssets = {
  role?: number;
  isOpen: boolean;
  onClose: () => void;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDeskripsi : (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeKategori :(e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeJumlah :(e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeImage :(e: React.ChangeEvent<HTMLInputElement>) => void
}
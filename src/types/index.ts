import React from "react"

export type buttonProps = {
   title: string
   onClick: ()=> void
   isLoading: boolean
   isDisabled: boolean
}

export type inputProps = {
   label: string
   type: string
   placeholder: string
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type inputTextAreaProps = {
   label: string
   type: string
   placeholder: string
   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export type inputSelectProps = {
   label: string
   type: string
   placeholder: string
   value: string | number
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
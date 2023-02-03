import React from 'react'

interface InputProps {
    label: string,
    placeHolder: string,
    readOnly?: boolean,
    value?: string,
    onChange: () => void,
    type: string
}
export default function Input(props: InputProps) {
    const { label, placeHolder, readOnly, value, onChange, type, ...nativeProps} = props
    return (
        <>
            <label htmlFor="name" className="form-label text-lg fw-medium color-palette-1 mb-10">{label}</label>
            <input type={type} className="form-control rounded-pill text-lg" id="name" name="name"
                aria-describedby="name" placeholder={placeHolder} {...nativeProps} readOnly={readOnly} value={value}
                onChange={onChange}/>
        </>
    )
}

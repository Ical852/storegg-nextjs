import React from 'react'
import cx from 'classnames'

interface ReachedItemProps {
    title: string,
    total: string,
    first: boolean
}
export default function ReachedItem(props: Partial<ReachedItemProps>) {
    const {total, title, first = false} = props
    const classes = cx({
        'me-lg-35': true,
        'ms-lg-35': first ? false : true
    })
    return (
        <div className={classes}>
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">{total}</p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">{title}</p>
        </div>
    )
}

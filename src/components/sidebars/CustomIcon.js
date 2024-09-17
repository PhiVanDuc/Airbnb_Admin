import { cloneElement } from 'react';

export default function CustomIcon({ icon, size, style }) {
    return (
        cloneElement(icon, { size, className: style })
    )
}

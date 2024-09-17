"use client"

import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

const IconDisplay = ({ searchQuery }) => {
    return (
        <div>
            {Object.keys(FaIcons)
                .filter((iconName) => iconName.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((iconName) => {
                const IconComponent = FaIcons[iconName];

                return (
                    <div key={iconName} style={{ display: 'inline-block', margin: '10px', textAlign: 'center' }}>
                        <IconComponent size={32} />
                        <p>{iconName}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default function IconsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
    <div>
        <h1>Search FontAwesome Icons</h1>
        <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
        />
        <IconDisplay searchQuery={searchQuery} />
    </div>
    )
}
"use client"

export const get = (key) => {
    const info = localStorage?.getItem(key);
    if (info) return JSON.parse(info);
    return null;
}

export const set = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const del = (key) => {
    localStorage.removeItem(key);
}
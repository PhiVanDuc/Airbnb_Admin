function parseCookieString(cookieString) {
    const cookies = cookieString.split(', ');
    const cookieObject = {};
    
    cookies.forEach(cookie => {
        const parts = cookie.split(';')[0];
        const test = parts.split('=');

        if (test.length === 2) {
            cookieObject[`${test[0].trim()}`] = test[1];
        }
    });

    return cookieObject;
}

export default parseCookieString;
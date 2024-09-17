import { SignJWT, jwtVerify } from "jose";

export async function encrypt(payload) {
    const secretKey = "secret";
    const key = new TextEncoder().encode(secretKey);

    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("365d")
      .sign(key);
}

export async function decrypt(input) {
    try {
        const secretKey = "secret";
        const key = new TextEncoder().encode(secretKey);
    
        const { payload } = await jwtVerify(input, key, {
          algorithms: ["HS256"],
        });
    
        return {
            success: true,
            payload
        }
    }
    catch(error) {
        return {
            success: false
        }
    }
}
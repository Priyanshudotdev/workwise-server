const getEnv = (key:string,defaultValue?:string):string => {
    const value = process.env[key] || defaultValue;

    if(!value) throw new Error(`Missing env variable ${key}`);

    return value;
}

export const env = {
    PORT: getEnv("PORT"),
    MONGODB_URI: getEnv("MONGODB_URI"),
    NODE_ENV: getEnv("NODE_ENV"),
    JWT_REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    JWT_SECRET: getEnv("JWT_SECRET")
}

export default env
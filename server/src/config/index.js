export default {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    REGION: process.env.REGION,
    BUCKET: process.env.BUCKET
}
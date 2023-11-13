import crypto from "crypto";

const SECRET = process.env.SECRET;

const random = () => crypto.randomBytes(128).toString("base64");
const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha264", [salt, password].join("/"))
    .update(SECRET)
    .digest();
};

export { authentication, random };

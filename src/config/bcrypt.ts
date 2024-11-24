import bcrypt from "bcryptjs";

export const HashedPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    } catch (err: any) {
        throw new Error(err);
    }
};

export const VerifyPassword = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (err: any) {
        throw new Error(err)
    }
}
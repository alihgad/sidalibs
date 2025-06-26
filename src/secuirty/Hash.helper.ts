import * as bcrypt from 'bcrypt';

export const Hash = (plainText: string, saltRounds: number = Number(process.env.SALT_ROUND)): string => {
    return bcrypt.hashSync(plainText, saltRounds);
}
export const CompareHash=async(plainText:string,hash:string) : Promise<boolean>=>{
    return await bcrypt.compare(plainText,hash);
}
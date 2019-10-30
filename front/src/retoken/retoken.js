import {decode} from 'jsonwebtoken';
export default function retoken(token) {
    const decoded = decode(token);
    console.log("DECODE:",decoded);
    return Number.parseInt(decoded.exp) >= Number.parseInt(new Date().getTime() / 1000);

}
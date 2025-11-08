import * as fs from 'fs';
import * as path from 'path';

export interface LoginData {
    logindata: {
        emailTemplate: string;
        password: string;
    };
}

export class DataLoader {
    static loadLoginData(): LoginData {
        const dataPath = path.join(__dirname, '../data/login.data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    }
}
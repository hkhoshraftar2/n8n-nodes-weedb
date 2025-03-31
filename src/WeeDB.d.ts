export = WeeDB;
declare class WeeDB {
    static instance: WeeDB | null;
    static getInstance(filename: string): WeeDB | null;
    constructor(filename: any);
    filePath: any;
    dataCache: any;
    loadingPromise: any;
    loadData(): Promise<void>;
    saveData(): Promise<void>;
    create(item: any): Promise<any>;
    createObject(item: any): Promise<any>;
    read(id: any): Promise<any>;
    update(id: any, updatedFields: any): Promise<any>;
    delete(id: any): Promise<boolean>;
    list(): Promise<any>;
    set(key: any, value: any): Promise<boolean>;
    get(key: any): Promise<any>;
    remove(key: any): Promise<boolean>;
    removeKeysByPattern(pattern: any): Promise<any>;
    getAllKeys(): Promise<string[]>;
    searchKeys(pattern: any): Promise<any[]>;
}

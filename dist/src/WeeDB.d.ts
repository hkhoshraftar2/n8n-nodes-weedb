export = WeeDB;
declare class WeeDB {
    static getInstance(filename: any): any;
    constructor(filename: any);
    filePath: any;
    dataCache: any;
    loadingPromise: any;
    loadData(): Promise<void>;
    saveData(): Promise<void>;
    create(item: any): Promise<any>;
    createObject(item: any): Promise<{
        id: string;
        item: any;
    }>;
    read(id: any): Promise<any>;
    update(id: any, updatedFields: any): Promise<any>;
    delete(id: any): Promise<boolean>;
    list(): Promise<any>;
    set(key: any, value: any): Promise<boolean>;
    get(key: any): Promise<any>;
    remove(key: any): Promise<boolean>;
    removeKeysByPattern(pattern: any): Promise<{
        removed: string[];
        count: number;
    }>;
    getAllKeys(): Promise<string[]>;
    searchKeys(pattern: any): Promise<any[]>;
}
declare namespace WeeDB {
    let instance: any;
}

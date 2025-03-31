"use strict";
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

class WeeDB {
    constructor(filename) {
        // Store data in user's home directory under .weedb
        const userHome = os.homedir();
        const dataDir = path.join(userHome, '.weedb');
        this.filePath = path.join(dataDir, filename + '.weedb.json');
        
        // Ensure .weedb directory exists
        fs.mkdir(dataDir, { recursive: true })
            .catch(err => console.error('Error creating .weedb directory:', err));

        console.log(this.filePath);
        this.dataCache = null;
        this.loadingPromise = null;
    }
    static getInstance(filename) {
        if (!WeeDB.instance) {
            WeeDB.instance = new WeeDB(filename);
        }
        return WeeDB.instance;
    }
    async loadData() {
        if (this.dataCache !== null)
            return;
        if (this.loadingPromise) {
            await this.loadingPromise;
            return;
        }
        this.loadingPromise = fs.readFile(this.filePath, 'utf-8')
            .then(rawData => {
            try {
                this.dataCache = JSON.parse(rawData);
            }
            catch (parseError) {
                console.error('JSON parse error:', parseError);
                this.dataCache = { items: [], keyValues: {} };
            }
        })
            .catch(async (error) => {
            if (error.code === 'ENOENT') {
                this.dataCache = { items: [], keyValues: {} };
                await this.saveData();
            }
            else {
                console.error('Error loading data:', error);
                throw error;
            }
        })
            .finally(() => {
            this.loadingPromise = null;
        });
        await this.loadingPromise;
    }
    async saveData() {
        if (this.dataCache) {
            try {
                await fs.writeFile(this.filePath, JSON.stringify(this.dataCache, null, 2), 'utf-8');
            }
            catch (error) {
                console.error('Error saving data:', error);
                throw new Error('Failed to save data to file.');
            }
        }
    }
    async create(item) {
        await this.loadData();
        const newItem = { id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, ...item };
        this.dataCache.items.push(newItem);
        await this.saveData();
        return newItem;
    }
    async createObject(item) {
        await this.loadData();
        const newItem = { id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, item };
        this.dataCache.items.push(newItem);
        await this.saveData();
        return newItem;
    }
    async read(id) {
        await this.loadData();
        return this.dataCache.items.find(item => item.id === id) || null;
    }
    async update(id, updatedFields) {
        await this.loadData();
        const itemIndex = this.dataCache.items.findIndex(item => item.id === id);
        if (itemIndex === -1)
            return null;
        this.dataCache.items[itemIndex] = { ...this.dataCache.items[itemIndex], ...updatedFields };
        await this.saveData();
        return this.dataCache.items[itemIndex];
    }
    async delete(id) {
        await this.loadData();
        const initialLength = this.dataCache.items.length;
        this.dataCache.items = this.dataCache.items.filter(item => item.id !== id);
        if (this.dataCache.items.length === initialLength)
            return false;
        await this.saveData();
        return true;
    }
    async list() {
        await this.loadData();
        return this.dataCache.items;
    }
    async set(key, value) {
        await this.loadData();
        this.dataCache.keyValues[key] = value;
        await this.saveData();
        return true;
    }
    async get(key) {
        await this.loadData();
        return key in this.dataCache.keyValues ? this.dataCache.keyValues[key] : null;
    }
    async remove(key) {
        await this.loadData();
        if (key in this.dataCache.keyValues) {
            delete this.dataCache.keyValues[key];
            await this.saveData();
            return true;
        }
        return false;
    }

    async removeKeysByPattern(pattern) {
        await this.loadData();
        const regex = new RegExp(pattern);
        const removedKeys = [];
        
        // Find all keys matching the pattern
        for (const key in this.dataCache.keyValues) {
            if (regex.test(key)) {
                delete this.dataCache.keyValues[key];
                removedKeys.push(key);
            }
        }
        
        // Save changes if any keys were removed
        if (removedKeys.length > 0) {
            await this.saveData();
        }
        
        return {
            removed: removedKeys,
            count: removedKeys.length
        };
    }
    
    async getAllKeys() {
        await this.loadData();
        return Object.keys(this.dataCache.keyValues);
    }
    async searchKeys(pattern) {
        await this.loadData();
        let regex;
        try {
            regex = new RegExp(pattern);
        }
        catch (error) {
            console.error('Invalid regex pattern:', error);
            throw new Error(`Invalid regex pattern: ${pattern}`);
        }
        return Object.keys(this.dataCache.keyValues)
            .filter(key => regex.test(key))
            .map(key => this.dataCache.keyValues[key]);
    }
}
WeeDB.instance = null;
module.exports = WeeDB;
//# sourceMappingURL=WeeDB.js.map
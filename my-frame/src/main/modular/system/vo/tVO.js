module.exports = class TVO {
    constructor() {
        this.set = this.setKey.bind(this);
        this.get = this.getKey.bind(this);
        this.toString = this.toThisString.bind(this);
        this.toMapperMapping = this.columnMapping.bind(this);
    }

    setKey(key, val) {
        if (!this.hasOwnProperty(key)) {
            throw TypeError(`The ${key} is undefined`);
        }
        this[key] = val;
    }

    getKey(key) {
        return this[key] || null;
    }

    toThisString() {
        return this;
    }

    columnMapping(rowDataPacket = null, Model = null) {
        if (!rowDataPacket) {
            return rowDataPacket;
        }

        let i = 0;
        const listMap = [];
        rowDataPacket.forEach(row => {
            let rowMap = Object.keys(row);
            let thisModel = new this.ClassName();
            rowMap.forEach(key => {
                if (thisModel.hasOwnProperty(key)) {
                    thisModel.set(key, rowDataPacket[i][key]);
                }
            });
            i++;
            listMap.push(thisModel);
        });
        return listMap;
    }
};
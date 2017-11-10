import {observable, action} from 'mobx';

class LogRecord {
    @observable timeStamp;
    @observable message;

    constructor(timeStamp, message) {
        this.timeStamp = timeStamp;
        this.message = message;
    }
}

class LogsStore {
    @observable Logs = [];

    constructor(maxRecords) {
        this.maxRecords = maxRecords;
        this.addRecord('Server\'s log messages will be printed here...');
    }

    addZero = (num, digit = 2) => {
        let retStr = '';

        while (num < 10 * (--digit))
            retStr += 0;

        return retStr + num.toString();
    };

    @action.bound
    addRecord(record) {
        const now = new Date();
        const dateStr =
            `${this.addZero(now.getDate())}.${this.addZero(now.getMonth())}.${now.getFullYear()} \
             ${this.addZero(now.getHours())}:${this.addZero(now.getMinutes())}:${this.addZero(now.getSeconds())} \
             ${this.addZero(now.getMilliseconds(), 3)}`;

        if (this.Logs.length < this.maxRecords) {
            this.Logs.push(
                new LogRecord(dateStr, record)
            );
        } else {
            this.Logs = [
                ...this.Logs.slice(1),
                new LogRecord(dateStr, record)
            ];
        }
    }
}

const logsStore = new LogsStore(10);
export default logsStore;
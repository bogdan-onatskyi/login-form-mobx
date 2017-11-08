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
    maxRecords = 10;

    @observable Logs = [];

    constructor(maxRecords) {
        this.maxRecords = maxRecords;
        this.addRecord('Server\'s log messages will be printed here...');
    }

    @action.bound
    addRecord(record) {
        const now = new Date();
        const dateStr = `${now.getDate()}.${now.getMonth()}.${now.getFullYear()} \
                ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} \
                ${now.getMilliseconds()}`;

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

export default LogsStore;
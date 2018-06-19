/**
 * Key value pair of the request data
 * The key represents the id of the businessdata
 * The value is the input value for execution
 */
export class ExecutionRequestData {
    Key?: number;
    Value?: string;

    constructor(key?: number, value?: string) {
        this.Key = key;
        this.Value = value;
    }
}

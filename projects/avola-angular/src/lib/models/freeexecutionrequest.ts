import { ApiExecutionRequest } from './apiexecutionrequest';

export class FreeExecutionRequest extends ApiExecutionRequest {
    DecisionTableId: number;

    constructor(tableId: number) {
        super();
        this.DecisionTableId = tableId;
    }
}

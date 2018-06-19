import { ExecutionRequestData } from './executionrequestdata';

/**
 * This class is the execution request that the Avola Decision Api needs to execute a decision service version
 * decisionServiceId: the id of the service version
 * versionNumber: what version of the decision service
 * reference: optional string reference, you can use this tas a reference to group or find back execution results
 */
export class ApiExecutionRequest {
    public DecisionServiceId?: number;
    public VersionNumber?: number;
    public Reference?: string;
    public ExecutionRequestData?: Array<ExecutionRequestData>;
    public ExecutionRequestMetaData?: Array<ExecutionRequestData>;

    constructor(decisionserviceid?: number, versionnumber?: number, reference?: string,
        executionrequestdata?: Array<ExecutionRequestData>, executionrequestmetadata?: Array<ExecutionRequestData>) {
        this.DecisionServiceId = decisionserviceid;
        this.VersionNumber = versionnumber;
        this.Reference = reference;
        this.ExecutionRequestData = executionrequestdata;
        this.ExecutionRequestMetaData = executionrequestmetadata;
    }
}

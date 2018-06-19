import { HitConclusion } from './hitconclusion';
import { ErrorMessage } from './errormessage';

/**
 * Describes the result of an execution
 * reference: the same reference as with the request
 * finalConclusionBusinessDataIds: this is the businessdata id of the final conclusion (use this to quickly find the top conclusion)
 * hitConclusions: array of all the conclusions that were hit
 */
export interface ExecutionResult {
    DecisionTableId?: number;
    DecisionServiceId?: number;
    Reference?: string;
    FinalConclusionBusinessDataIds?: Array<number>;
    ConclusionValueType?: ExecutionResult.ConclusionValueTypeEnum;
    HitConclusions?: Array<HitConclusion>;
    Errors?: Array<ErrorMessage>;
}

export namespace ExecutionResult {
    export type ConclusionValueTypeEnum = 'Success' | 'NoConclusion' | 'Error';
    export const ConclusionValueTypeEnum = {
        Success: 'Success' as ConclusionValueTypeEnum,
        NoConclusion: 'NoConclusion' as ConclusionValueTypeEnum,
        Error: 'Error' as ConclusionValueTypeEnum
    }
}

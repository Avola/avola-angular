import { DecisionServiceVersionBusinessData } from './decisionserviceversionbusinessdata';
import { DecisionServiceVersionListData } from './decisionserviceversionlistdata';
import { DecisionServiceVersionPairData } from './decisionserviceversionpairdata';

/**
 * Object that describes properties about a decision service version
 */
export interface DecisionServiceVersionDescription {
    DecisionServiceId?: number;
    Name?: string;
    DecisionName?: string;
    DecisionServiceVersionId?: number;
    VersionNumber?: number;
    InputData?: Array<DecisionServiceVersionBusinessData>;
    OutputData?: Array<DecisionServiceVersionBusinessData>;
    TraceData?: Array<DecisionServiceVersionBusinessData>;
    MetaData?: Array<DecisionServiceVersionBusinessData>;
    PairData?: Array<DecisionServiceVersionPairData>;
    ListData?: Array<DecisionServiceVersionListData>;
}

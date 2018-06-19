import { DecisionServiceVersionDescription } from './decisionserviceversiondescription';

/**
 * Object that describes properties about a decision service
 */
export interface DecisionServiceDescription {
    DecisionServiceId?: number;
    Name?: string;
    Versions?: Array<DecisionServiceVersionDescription>;
}

import { BusinessDataProperty } from './businessdataproperty';

/**
 * Describes the versioned businessdata
 */
export interface DecisionServiceVersionBusinessData {
    BusinessDataId?: number;
    Version?: number;
    Name?: string;
    Type?: string;
    Question?: string;
    Properties?: Array<BusinessDataProperty>;
}

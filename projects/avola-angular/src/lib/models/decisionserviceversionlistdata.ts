/**
 * Describes a versioned list with versioned list items
 */
export interface DecisionServiceVersionListData {
    ListId?: number;
    Items?: Array<DecisionServiceVersionListDataItem>;
}

export interface DecisionServiceVersionListDataItem {
    Id?: number;
    Order?: number;
    Value?: string;
    Name?: string;
}

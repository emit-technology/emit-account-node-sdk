export interface Block {
    num: number;
    timestamp: number;
    parent_hash: string;
    data_sets: Array<DataSet>;
    factor_set: FactorSet;
    data?: string;
}
export interface FactorSet {
    settles: Array<Settle>;
    outs: Array<Out>;
}
export interface Settle {
    from: string;
    num: number;
    index: number;
    factor: Factor;
}
export interface OutFactor {
    factor: Factor;
    timestamp: number;
}
export interface Factor {
    category: Category;
    value: string;
}
export interface Category {
    field: string;
    name: string;
}
export interface Out {
    target: string;
    factor: Factor;
}
export interface BlockWrapped {
    hash: string;
    block: Block;
}
export interface DataSet {
    name: string;
    data: string;
}
export interface PrepareBlock {
    address: string;
    blk: Block;
}
export interface BlockRef {
    num: number;
    hash: string;
}
export declare const getDefaultHash: () => string;

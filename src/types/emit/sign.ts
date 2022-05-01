export interface Sign {
    r: string
    s: string
}

export interface MsgWithSign<T> {
    data: T,
    sign: SignWithAddress
}

export interface SignWithAddress {
    addr: string
    sign: Sign
}
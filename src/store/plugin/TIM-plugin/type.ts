
export interface ITMProps {
    SDKAppID:number
}

export interface TIMLogin {
    userID:string,
    userSig:string
}

export interface ITMPaylod {
    text:string
}

export interface ITMEvents {
    name:string,
    data: ITMEvent[]
}

export interface ITMEvent {
    payload:ITMPaylod,
    flow:"in" | "out"
}
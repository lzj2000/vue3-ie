export interface TemplateData{
    name: string;
    fullName: string;
}

export interface componentTemplateData{
    name: string;
    fullName: string;
    mark: string;
    detail: any;
    style: any;
    components?:Function;
    click?:any;
}

export interface pageData{
    components: componentTemplateData[];
    detail: {
        name: string;
        title: string;
        date: never[];
    };
    mark: string;
}

export interface styleData {
    width:number,
    height:number,
    align:string
}
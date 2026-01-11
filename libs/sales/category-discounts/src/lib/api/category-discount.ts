export interface CategoryDiscount {
    id:number;
    parentId:number; //Customer category
    articleId:number;
    discount:number;
    reference: string;
    description?: string;
}

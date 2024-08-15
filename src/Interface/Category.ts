import {BookCategoryResponse} from "./Book";

export interface Category{
    categoryID:number,
    categoryName:string,
    books:BookCategoryResponse[];
};

export interface NewCategory{
    categoryName:string,
}
import {Author} from "./Author";
import { Category } from "./Category";
import { Publisher } from "./Publisher";

export interface Books{
    bookID:number,
    title:string,
    categoryName: string,
    publisherName:string,
    authorName:string,
    authorId: number;
    publisherId: number;
    categoryId: number;
};

export interface NewBook {
    title: string;
    authorId: number;
    publisherId: number;
    categoryId: number;
}

export interface BookPublisherResponse{
    bookID:number,
    title:string,
    authorName:string,
    categoryName:string
}

export interface BookCategoryResponse{
    bookID:number,
    title:string,
    authorName:string,
    publisherName:string
}

export interface BookAuthorResponse{
    bookID:number,
    title:string,
    categoryName:string,
    publisherName:string
}







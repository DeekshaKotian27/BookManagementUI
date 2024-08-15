import {BookAuthorResponse} from "./Book";

export interface Author{
    authorId:number,
    firstName:string,
    lastName:string,
    books:BookAuthorResponse[];
}

export interface newAuthor{
    firstName:string,
    lastName:string,
}
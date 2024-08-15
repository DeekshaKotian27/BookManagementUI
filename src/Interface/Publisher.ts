import {BookPublisherResponse} from "./Book";

export interface Publisher{
    publisherID:number;
    publisherName:string;
    publisherAddress:string;
    publisherPhoneNumber:string;
    publisherEmailId:string;
    books:BookPublisherResponse[];
}

export interface NewPublisher{
    publisherName:string;
    publisherAddress:string;
    publisherPhoneNumber:string;
    publisherEmailId:string;
}
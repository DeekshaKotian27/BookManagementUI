import { Author, newAuthor } from "./Author";
import { Books, NewBook } from "./Book";
import { Category, NewCategory } from "./Category";
import { NewPublisher, Publisher } from "./Publisher";
import { User } from "./Users";

export interface ValidationResponse{
    success:boolean,
    message:string,
    data?:User|User[]|Publisher|Publisher[]|NewPublisher|Category|Category[]|NewCategory|Books|NewBook|Books[]|Author|Author[]|newAuthor,
}
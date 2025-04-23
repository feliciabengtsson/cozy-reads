import cors from "cors";
import express, { Request, Response } from "express";
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

let database: Database;

(async () => {
    database = await sqlite.open({
        driver: sqlite3.Database,
        filename: "test.sqlite",
    });

    await database.run("PRAGMA foreign_keys = ON");

    console.log("Redo att göra databasanrop");
})();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/books/:id", async (request: Request, response: Response) => {
    try {
        const books = await database.all(
            "SELECT * FROM books"
        );
        let findBook = books.find(
            (books) => books.book_id === Number(request.params.id)
        );
        console.log(findBook, "findBook");
    
        if (findBook) {
            response.status(200).send(findBook);
        } else {
            response.status(404).send("Not Found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/books", async (request: Request, response: Response) => {
    const books = await database.all("SELECT * FROM books");

    console.log(books, "books");
    response.status(200).send(books);
});
app.post("/books", async (request: Request, response: Response) => {
    const newBook = await database.run(
        "INSERT INTO books (book_id, title, author, genre, year, cover_url, summary) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            request.body.book_id,
            request.body.title,
            request.body.author,
            request.body.genre,
            request.body.year,
            request.body.cover_url,
            request.body.summary,
        ]
    );

    const addedBook = await database.get(
        "SELECT * FROM books WHERE id = ?",
        newBook.lastID
    );
    console.log(addedBook, "addedBook");
    response.status(201).send(addedBook);
});
app.get("/bookcircles", async (request: Request, response: Response) => {
    const circles = await database.all("SELECT * FROM circles");

    console.log(circles, "books");
    response.status(200).send(circles);
});
app.get("/bookcircles/:id", async (request: Request, response: Response) => {
    try {
        const circles = await database.all(
            `SELECT 
                circles.circles_id, 
                circles.name,
                books.title AS currently_reading, 
                circles.meeting_schedule, 
                circles.latest_comment, 
                circles.next_meetup, 
                circles.image 
            FROM circles 
            LEFT JOIN books ON circles.currently_reading = books.book_id`
        );
        let findCircle = circles.find(
            (circle) => circle.circles_id === Number(request.params.id)
        );
        console.log(findCircle, "findCircle");
    
        if (findCircle) {
            response.status(200).send(findCircle);
        } else {
            response.status(404).send("Not Found");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/profile", async (request: Request, response: Response) => {});
app.get("/", async (request: Request, response: Response) => {});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

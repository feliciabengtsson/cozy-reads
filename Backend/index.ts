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
        const books = await database.all("SELECT * FROM books");
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
    try {
        const circles = await database.all(
            `SELECT 
                circles.circles_id, 
                circles.name,
                books.title AS currently_reading, 
                books.cover_url AS cover_url,
                circles.meeting_schedule, 
                circles.latest_comment, 
                circles.next_meetup, 
                circles.image 
            FROM circles 
            LEFT JOIN books ON circles.currently_reading = books.book_id`
        );

        console.log(circles, "books");
        response.status(200).send(circles);
    }
    catch (error) {
        console.log(error)
        response.status(500).send('error');
    }
});
app.post("/bookcircles", async (request: Request, response: Response) => {
    console.log(request.body, 'info från form')
    
    let name = request.body.name;
    let schedule = request.body.schedule;
    let image = request.body.image;
    const circles = await database.all("SELECT * FROM circles");

    if (circles.some((circle) => circle.name === name) === true) {
        response.status(409).send("Conflict");
    } else if (
        name !== "" &&
        name !== null &&
        schedule !== null &&
        name !== ""
    ) {
        await database.run(
            "INSERT INTO circles (name, meeting_schedule, image) VALUES (?, ?, ?)",
            [name, schedule, image]
        );
        console.log('lyckat')
        response.status(201).send("Created");
    } else {
        response.status(400).send("Bad Request");
    }

});
app.get("/bookcircles/:id", async (request: Request, response: Response) => {
    try {
        const circles = await database.all(
            `SELECT 
                circles.circles_id, 
                circles.name,
                books.title AS currently_reading, 
                books.cover_url AS cover_url,
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
app.delete("bookcircles/:id", (request, response) => {
/*     findCity = cities.findIndex((city) => city.id === request.params.id);
    console.log(findCity, "findCity");

    if (findCity >= 0) {
        cities.splice(findCity, 1);
        console.log(findCity, "deleted");

        response.status(200).send(findCity);
    } else {
        response.status(404).send("Not Found");
    } */
});
app.put("profile", async (request, response) => {
    console.log(request.body, 'info från form')
    
    let name = request.body.name;
    let address = request.body.address;
    let users_id = request.body.users_id;
    let image = request.body.image;

    const users = await database.all("SELECT * FROM circles");

    const findUser = users.find((user) => user.users_id === request.body.users_id);
    console.log(findUser, "findUser");

    if (!name || !address || !users_id || !image || Object.keys(request.body).length > 4) {
        response.status(400).send("Bad Request");
    } else if (
        users.some((user) => user.name === name) === true ||
        users.some((user) => user.address === address) === true ||
        users.some((user) => user.users_id === users_id) === true ||
        users.some((user) => user.image === image) === true
    ) {
        response.status(409).send("Conflict");
    } else if (
        users_id !== null &&
        name !== "" &&
        name !== null &&
        address !== "" &&
        address !== null &&
        image !== "" &&
        image !== null &&
        request.body.hasOwnProperty("name") &&
        request.body.hasOwnProperty("address") &&
        request.body.hasOwnProperty("users_id") &&
        request.body.hasOwnProperty("image")
    ) {
        findUser.name = name;
        findUser.address = address;
        findUser.image = image;
        console.log(users, "uppdatering");

        response.status(200).send(users);
    } else {
        response.status(400).send("Bad Request");
    }
});
app.get("/profile", async (request: Request, response: Response) => {
    const members = await database.all("SELECT * FROM users");

    console.log(members, "members");
    response.status(200).send(members);
});
app.get("/", async (request: Request, response: Response) => {});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

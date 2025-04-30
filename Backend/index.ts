/* https://www.quackit.com/sqlite/tutorial/delete_data.cfm
 */
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
    try {
        console.log(request.query.genre, "request.query.genre");

        if (request.query.genre) {
            const genre = request.query.genre;

            const filteredBooks = await database.all(
                "SELECT * FROM books WHERE genre = ?",
                [genre]
            );

            console.log(filteredBooks, `books with genre: ${genre}`);
            response.status(200).send(filteredBooks);
        } else {
            const books = await database.all("SELECT * FROM books");

            console.log(books, "books");
            response.status(200).send(books);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.post("/books", async (request: Request, response: Response) => {
    try {
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
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
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
    } catch (error) {
        console.log(error);
        response.status(500).send("error");
    }
});
app.post("/bookcircles", async (request: Request, response: Response) => {
    try {
        console.log(request.body, "info from form");

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
            console.log("lyckat");
            response.status(201).send("Created");
        } else {
            response.status(400).send("Bad Request");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
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
app.delete("/bookcircles/:id", async (request, response) => {
    try {
        await database.run("DELETE FROM book_circles WHERE circle_id=?", [
            request.params.id,
        ]);
        await database.run("DELETE FROM circles WHERE circles_id=?", [
            request.params.id,
        ]);

        response.status(200).send("ok");
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.put("/profile", async (request, response) => {
    try {
        console.log(request.body, "info from form");

        const name = request.body.name;
        const id = request.body.id;

        const users = await database.all("SELECT * FROM users");

        const findUser = users.find((user) => user.users_id === id);
        console.log(findUser, "findUser");

        const address = findUser.address;
        const image = findUser.image;
        if (
            !name ||
            !address ||
            !id ||
            !image ||
            Object.keys(request.body).length > 4
        ) {
            console.log("Bad Request");
            response.status(400).send("Bad Request");
        } else if (
            id !== null &&
            name !== "" &&
            name !== null &&
            address !== "" &&
            address !== null &&
            image !== "" &&
            image !== null
        ) {
            await database.run(
                "UPDATE users SET name=?, address=?, image=? WHERE users_id=?",
                [name, address, image, id]
            );
            console.log(findUser, "update");

            response.status(200).send(findUser);
        } else {
            console.log("Bad Request");
            response.status(400).send("Bad Request");
        }
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/profile", async (request: Request, response: Response) => {
    try {
        const members = await database.all("SELECT * FROM users");

        console.log(members, "members");
        response.status(200).send(members);
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});
app.get("/", async (request: Request, response: Response) => {
    try {
        response.status(200).send("ok");
    } catch (error) {
        console.error(error);
        response.status(500).send("error");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

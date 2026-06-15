import cors from "cors";
import express, { Request, Response } from "express";
import { Pool } from "pg";

interface Book {
  book_id: number;
  title: string;
  author: string;
  genre: string;
  year: number;
  cover_url: string;
  summary: string;
}

interface Circle {
  circles_id: number;
  name: string;
  meeting_schedule: string;
  currently_reading: string;
  latest_comment: string;
  next_meetup: string;
  image: string;
  cover_url: string;
}

interface User {
  users_id: number;
  name: string;
  address: string;
  image: string;
}

const database = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log("Redo att göra databasanrop mot Neon");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/books/:id", async (request: Request, response: Response) => {
  try {
    const result = await database.query<Book>(
      "SELECT * FROM books WHERE book_id = $1",
      [request.params.id],
    );

    const book = result.rows[0];

    if (book) {
      response.status(200).send(book);
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
    const genre = request.query.genre;

    if (genre) {
      const result = await database.query<Book>(
        "SELECT * FROM books WHERE genre = $1",
        [genre],
      );

      response.status(200).send(result.rows);
    } else {
      const result = await database.query<Book>("SELECT * FROM books");

      response.status(200).send(result.rows);
    }
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.post("/books", async (request: Request, response: Response) => {
  try {
    const result = await database.query<Book>(
      `
      INSERT INTO books 
        (title, author, genre, year, cover_url, summary) 
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        request.body.title,
        request.body.author,
        request.body.genre,
        request.body.year,
        request.body.cover_url,
        request.body.summary,
      ],
    );

    response.status(201).send(result.rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.get("/bookcircles", async (request: Request, response: Response) => {
  try {
    const result = await database.query<Circle>(
      `
      SELECT
        circles.circles_id,
        circles.name,
        books.title AS currently_reading,
        books.cover_url AS cover_url,
        circles.meeting_schedule,
        circles.latest_comment,
        circles.next_meetup,
        circles.image
      FROM circles
      LEFT JOIN books ON circles.currently_reading = books.book_id
      `,
    );

    response.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.post("/bookcircles", async (request: Request, response: Response) => {
  try {
    const name: string = request.body.name;
    const schedule: string = request.body.schedule;
    let image: string | null = request.body.image;

    if (!name || !schedule) {
      response.status(400).send("Bad Request");
      return;
    }

    const existingCircle = await database.query<Circle>(
      "SELECT * FROM circles WHERE name = $1",
      [name],
    );

    if (existingCircle.rows.length > 0) {
      response.status(409).send("Conflict");
      return;
    }

    if (image === "") {
      image = null;
    }

    let result;

    if (image) {
      result = await database.query<Circle>(
        `
        INSERT INTO circles 
          (name, meeting_schedule, image) 
        VALUES 
          ($1, $2, $3)
        RETURNING *
        `,
        [name, schedule, image],
      );
    } else {
      result = await database.query<Circle>(
        `
        INSERT INTO circles 
          (name, meeting_schedule) 
        VALUES 
          ($1, $2)
        RETURNING *
        `,
        [name, schedule],
      );
    }

    response.status(201).send(result.rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.get("/bookcircles/:id", async (request: Request, response: Response) => {
  try {
    const result = await database.query<Circle>(
      `
      SELECT
        circles.circles_id,
        circles.name,
        books.title AS currently_reading,
        books.cover_url AS cover_url,
        circles.meeting_schedule,
        circles.latest_comment,
        circles.next_meetup,
        circles.image
      FROM circles
      LEFT JOIN books ON circles.currently_reading = books.book_id
      WHERE circles.circles_id = $1
      `,
      [request.params.id],
    );

    const circle = result.rows[0];

    if (circle) {
      response.status(200).send(circle);
    } else {
      response.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.delete("/bookcircles/:id", async (request: Request, response: Response) => {
  try {
    await database.query("DELETE FROM book_circles WHERE circle_id = $1", [
      request.params.id,
    ]);

    await database.query("DELETE FROM circles WHERE circles_id = $1", [
      request.params.id,
    ]);

    response.status(200).send("ok");
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.put("/profile", async (request: Request, response: Response) => {
  try {
    const name: string = request.body.name;
    const id: number = request.body.id;

    if (!name || !id || Object.keys(request.body).length > 2) {
      response.status(400).send("Bad Request");
      return;
    }

    const userResult = await database.query<User>(
      "SELECT * FROM users WHERE users_id = $1",
      [id],
    );

    const user = userResult.rows[0];

    if (!user) {
      response.status(404).send("Not Found");
      return;
    }

    const updatedUser = await database.query<User>(
      `
      UPDATE users 
      SET name = $1, address = $2, image = $3 
      WHERE users_id = $4
      RETURNING *
      `,
      [name, user.address, user.image, id],
    );

    response.status(200).send(updatedUser.rows[0]);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.get("/profile", async (request: Request, response: Response) => {
  try {
    const result = await database.query<User>("SELECT * FROM users");

    response.status(200).send(result.rows);
  } catch (error) {
    console.error(error);
    response.status(500).send("error");
  }
});

app.get("/", async (request: Request, response: Response) => {
  response.status(200).send("ok");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;

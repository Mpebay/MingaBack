import { expect } from "chai";
import app from "../app.js";
import request from "supertest";
import fs from "fs"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyaWNAbWguY29tLmFyIiwiaWF0IjoxNjk2MDA3MDQyLCJleHAiOjE2OTYwOTM0NDJ9.A4FyYBsXCUE7oqval8HpvODyGErPN2Kp5mRyKcjNCUc"

describe("tests para chapters", () => {
  before(function (done) {
    this.timeout(3000);
    setTimeout(done, 2500);
  });

        describe("subir capítulos", () => {
            it("retorna un 200 al subir un capítulo con un archivo de imagen", async () => {
                try{ 
                const image = fs.promises.readFile("images/image.jpg")
                const formData = new FormData();
                const manga_id = "6516d6426af4d69e7a5fdf72"
                const title = "manga prueba"
                const order = "1"
                const newCaapterData = {
                    manga_id: manga_id,
                    title : title,
                    order : order
                        }
                formData.append('chapterData', JSON.stringify(newCaapterData));
                formData.append("file", image);

                const response = await request(app)
                .post("/chapters")
                .set("Authorization", `Bearer ${token}`)
                .set("Content-Type", "multipart/form-data")
                .attach(formData);

            expect(response.status).to.equal(201);
        }catch(error){
            console.error(error)
        }
            });
            it("retorna un 400 al subir mal un capítulo con un archivo de imagen  ", async () => {
                const image = fs.promises.readFile("images/image.jpg")
                const formData = new FormData();
                formData.append("manga_id", "idNumerico");
                formData.append("title", "nombreDeCap");
                formData.append("order", "3");
                formData.append("file", image);

                const response = await request(app)
                .post("/chapters")
                .set("Authorization", `Bearer ${token}`)
                .attach(formData);

            expect(response.status).to.equal(400);
            });
  });
});

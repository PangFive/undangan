package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

func main() {
	// Create a new engine
	engine := html.New("./views", ".html")

	// Or from an embedded system
	// See github.com/gofiber/embed for examples
	// engine := html.NewFileSystem(http.Dir("./views", ".html"))

	// Pass the engine to the Views
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Get("/", func(c *fiber.Ctx) error {
		m := c.Queries()

		nama := "Tamu Undangan di Tempat"
		if m["to"] != "" {
			nama = m["to"]
		}

		// Render index
		return c.Render("index", fiber.Map{
			"Title":    "The Wedding of Faisal & Monica",
			"Mempelai": "Faisal & Ica",
			"Pria":     "Faisal Akbar Taufiq, S.S.T.Pel",
			"Wanita":   "Monica Purita",
			"Nama":     nama,
		})
	})

	app.Get("/add", func(c *fiber.Ctx) error {
		// Render index within layouts/main
		return c.Render("add", fiber.Map{
			"Title": "Hello, wahyu!",
		})
	})

	app.Get("/layouts-nested", func(c *fiber.Ctx) error {
		// Render index within layouts/nested/main within layouts/nested/base
		return c.Render("index", fiber.Map{
			"Title": "Hello, World!",
		}, "layouts/nested/main", "layouts/nested/base")
	})

	app.Static("/", "./public")

	log.Fatal(app.Listen(":3030"))
}

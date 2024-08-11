package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"golang/utils"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			return true
		},
	}))

	app.Post("/", getHandler)

	app.Get("/stop", func(c *fiber.Ctx) error {
		app.Shutdown()
		return c.JSON("ok")
	})

	err := app.Listen(":3000")
	if err != nil {
		return
	}
}

func getHandler(c *fiber.Ctx) error {

	var body []string
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).SendString("Bad Request")
	}

	res := make([]string, len(body))

	for i := 0; i < len(body); i++ {
		if !utils.CheckFileExists(body[i]) {
			return fiber.NewError(fiber.StatusNotFound, "File is not fount")
		}

		res[i] = utils.GetHash(body[i])
	}

	return c.JSON(res)
}

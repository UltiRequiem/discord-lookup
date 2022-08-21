import { Application, Router } from "https://deno.land/x/oak@v11.0.0/mod.ts";
import { getUser } from "./discord-user.ts";

const router = new Router();

router.get("/", (context) => {
  context.response.redirect("https://github.com/UltiRequiem/discord-lookup");
});

router.get("/:id", async (context) => {
  context.response.body = await getUser(context.params.id);
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });

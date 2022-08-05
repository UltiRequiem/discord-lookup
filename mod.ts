import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const TOKEN = Deno.env.get("DISCORD_TOKEN");

async function getUser(id: string | number) {
  const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${TOKEN}`,
    },
  });

  const data = response.json();

  return data;
}

const router = new Router();

router.get("/:id", async (context) => {
  const id = context.params.id;

  context.response.body = await getUser(id);
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });

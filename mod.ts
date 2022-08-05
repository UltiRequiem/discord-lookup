import { serve, Handler } from "https://deno.land/std@0.145.0/http/server.ts";

// import "https://deno.land/std@0.151.0/dotenv/load.ts";

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

const server: Handler = async (request) => {
  if (request.method !== "POST") {
    return new Response(undefined, { status: 405 });
  }

  const { pathname } = new URL(request.url);

  if (pathname !== "/") {
    return new Response(undefined, { status: 404 });
  }

  if (!request.body) {
    return new Response(undefined, { status: 422 });
  }

  const body = await request.json();

  if (!body.id) {
    return new Response(undefined, { status: 422 });
  }

  const data = await getUser(body.id);

  return new Response(JSON.stringify(data));
};

serve(server);

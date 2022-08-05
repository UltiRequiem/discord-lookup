const TOKEN = Deno.env.get("DISCORD_TOKEN");

export async function getUser(id: string | number) {
  const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
    headers: {
      Authorization: `Bot ${TOKEN}`,
    },
  });

  const data = response.json();

  return data;
}

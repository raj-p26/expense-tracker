import { goto } from "$app/navigation";
import { JWT_SECRET } from "$env/static/private";
import { User, type InsertUser } from "$lib/server/users";

import jwt from "jsonwebtoken";

export const ssr = false;

const user = new User();

export const load = ({ cookies }) => {
  return {
    token: cookies.get("token"),
  };
};

export const actions = {
  login: async ({ request }) => {},

  register: async ({ request, cookies }) => {
    let formData = await request.formData();

    let insertUser: InsertUser = {
      username: formData.get("username")!.toString(),
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    let userId = await user.insertUser(insertUser);

    let token = jwt.sign({ userId }, JWT_SECRET);

    cookies.set("token", token, { path: "http://localhost:5173/" });

    goto("/");
  },
};

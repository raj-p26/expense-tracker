import { redirect } from "@sveltejs/kit";

export const load = () => {
  redirect(302, "/");
};

export const actions = {
  default: ({ cookies }) => {
    if (cookies.get("token"))
      cookies.delete("token", { path: "http://localhost:5173/" });

    redirect(302, "/login");
  },
};

import { redirect } from "@sveltejs/kit";

export const load = () => {
  redirect(302, "/");
};

// didn't come up with any other ideas
export const actions = {
  default: ({ cookies }) => {
    if (cookies.get("token"))
      cookies.delete("token", { path: "http://localhost:5173/" });

    redirect(302, "/login");
  },
};

import { goto } from "$app/navigation";
import { JWT_SECRET } from "$env/static/private";
import { User, type InsertUser, type LoginUser } from "$lib/server/users";
import { redirect } from "@sveltejs/kit";

import jwt from "jsonwebtoken";

interface AuthErrors {
  usernameError?: string;
  emailError?: string;
  passwordError?: string;
  loginEmailError?: string;
  loginPasswordError?: string;
}

export const ssr = false;

const user = new User();

export const load = ({ cookies }) => {
  return {
    token: cookies.get("token"),
  };
};

export const actions = {
  login: async ({ request, cookies }) => {
    let errors: AuthErrors = {};
    let hadError = false;
    let formData = await request.formData();
    let email = formData.get("email")?.toString();
    let password = formData.get("password")?.toString();

    if (!email) {
      hadError = true;
      errors.loginEmailError = "Email is required!";
    }

    if (!password) {
      hadError = true;
      errors.loginPasswordError = "Password is required!";
    }

    if (hadError) return errors;
    let userData: LoginUser = {
      email: email!,
      password: password!,
    };

    let [userId, err] = await user.authenticate(userData);

    if (err != null) {
      hadError = true;
      errors.loginEmailError = err;
    }

    if (hadError) return errors;

    let token = jwt.sign({ userId }, JWT_SECRET);

    cookies.set("token", token, { path: "http://localhost:5173/" });

    redirect(302, "/");
  },

  register: async ({ request, cookies }) => {
    let formData = await request.formData();
    let errors: AuthErrors = {};
    let hadError = false;

    if (!formData.get("username")) {
      hadError = true;
      errors.usernameError = "Username is required";
    }

    if (!formData.get("email")) {
      hadError = true;
      errors.emailError = "Email is required.";
    }

    if (!formData.get("password")) {
      hadError = true;
      errors.passwordError = "Password is required";
    }

    let insertUser: InsertUser = {
      username: formData.get("username")!.toString(),
      email: formData.get("email")!.toString(),
      password: formData.get("password")!.toString(),
    };

    let [userId, err] = await user.insertUser(insertUser);

    if (err != null) {
      hadError = true;
      errors.emailError = "Email already exists";
    }

    if (hadError) return errors;

    let token = jwt.sign({ userId }, JWT_SECRET);

    cookies.set("token", token, { path: "http://localhost:5173/" });

    goto("/");
  },
};

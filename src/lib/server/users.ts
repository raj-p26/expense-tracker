import { DB_NAME } from "$env/static/private";
import Database from "better-sqlite3";
import * as bcrypt from "bcrypt";

export interface InsertUser {
  username: string;
  email: string;
  password: string;
}

export class User {
  private db = new Database(`${DB_NAME}.db`);

  public async insertUser(user: InsertUser) {
    let id = crypto.randomUUID();
    let password: string = await this.hashPassword(user.password);

    let query =
      "INSERT INTO users (id, username, email, password_) VALUES (?, ?, ?, ?) RETURNING id;";

    let res = this.db
      .prepare<string[], string>(query)
      .get(id, user.username, user.email, password);

    return res;
  }

  private async hashPassword(password: string): Promise<string> {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    return hash;
  }
}

import { DB_NAME } from "$env/static/private";
import Database from "better-sqlite3";
import * as bcrypt from "bcrypt";

export interface InsertUser {
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export class User {
  private db = new Database(`${DB_NAME}.db`);

  public async authenticate(user: LoginUser) {
    let query = "SELECT id, password_ FROM users WHERE email=?";
    let res = this.db
      .prepare<string, { id: string; password_: string }>(query)
      .get(user.email);

    if (!res?.id) return [undefined, "Invalid Credentials"];

    let passwordMatched = await this.compareHash(user.password, res?.password_);

    if (!passwordMatched) return [undefined, "Invalid Credentials"];

    return [res.id, null];
  }

  public async insertUser(user: InsertUser) {
    let id = crypto.randomUUID();
    let password: string = await this.hashPassword(user.password);

    let userExists = this.db
      .prepare<string, { "COUNT(*)": number }>(
        "SELECT COUNT(*) FROM users WHERE email=?"
      )
      .get(user.email);

    if (userExists!["COUNT(*)"]) return [undefined, "user already exists"];

    let query =
      "INSERT INTO users (id, username, email, password_) VALUES (?, ?, ?, ?) RETURNING id;";

    let res = this.db
      .prepare<string[], string>(query)
      .get(id, user.username, user.email, password);

    return [res, undefined];
  }

  private async compareHash(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  private async hashPassword(password: string): Promise<string> {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    return hash;
  }
}

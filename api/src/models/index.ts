import { Sequelize } from "sequelize";
import { BDD } from "../config";
import defineUtilisateurs, { UtilisateurModel } from "./utilisateurs.model";

const connectionUrl =
  process.env.DATABASE_URL ||
  `postgres://${BDD.user}:${BDD.password}@${BDD.host}/${BDD.bdname}`;

const sequelize = new Sequelize(connectionUrl, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  define: {
    timestamps: false
  }
});

export interface Database {
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
  utilisateurs: UtilisateurModel;
}

export const db: Database = {
  Sequelize,
  sequelize,
  utilisateurs: defineUtilisateurs(sequelize, Sequelize)
};

export default db;

import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface UtilisateurAttributes {
  id: string;
  nom: string;
  prenom?: string | null;
  login: string;
  pass?: string | null;
  email?: string | null;
}

export interface UtilisateurCreationAttributes
  extends Optional<UtilisateurAttributes, "id" | "prenom" | "pass" | "email"> {}

export interface UtilisateurInstance
  extends Model<UtilisateurAttributes, UtilisateurCreationAttributes>,
    UtilisateurAttributes {}

export type UtilisateurModel = ModelStatic<UtilisateurInstance>;

export default function defineUtilisateurs(
  sequelize: Sequelize,
  _seq?: typeof Sequelize
): UtilisateurModel {
  const Utilisateurs = sequelize.define<UtilisateurInstance>("utilisateurs", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return Utilisateurs;
}

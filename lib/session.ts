import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface IronSessionData {
  id?: number;
}

const sessionOption: SessionOptions = {
  cookieName: "self-study",
  password: process.env.COOKIE_PASSWORD!,
};

export const getSession = async () => {
  return await getIronSession<IronSessionData>(cookies(), sessionOption);
};

export const setSession = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
};

export const readSession = async (req: Request, res: Response) => {
  return getIronSession<IronSessionData>(req, res, sessionOption);
};

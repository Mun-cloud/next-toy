"use client";

export const readCookieFromStorageRouteHandler = async (): Promise<
  number | undefined
> => {
  const responseWithCookieFromStorage = await fetch(
    `${location.origin}/api/readIronSessionCookie`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await responseWithCookieFromStorage.json();
  const cookieValue = data?.id;
  return cookieValue;
};

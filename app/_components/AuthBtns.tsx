import Link from "next/link";

const AuthBtns = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <div className="flex items-center gap-3">
      {isLogin ? (
        <Link
          className="border rounded-[5px] px-3 py-1"
          href="/summary/profile"
        >
          profile
        </Link>
      ) : (
        <>
          <Link
            className="border rounded-[5px] px-3 py-1"
            href="/summary/login"
          >
            login
          </Link>
          <Link
            className="rounded-[5px] px-3 py-1 bg-white text-primary"
            href="/summary/signup"
          >
            sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AuthBtns;

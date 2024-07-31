import { auth, signOut } from "@/auth";

const TeacherDashboard = async () => {
  const session = await auth();

  const role = session?.user?.role;

  if (role !== "TEACHER") {
    return (
      <div>
        <p>you did not have acess to open this</p>
      </div>
    );
  }

  return (
    <div>
      Teacher Dashboard{" "}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default TeacherDashboard;

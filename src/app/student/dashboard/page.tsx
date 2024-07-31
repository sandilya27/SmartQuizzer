import { auth,signOut } from '@/auth';


const StudentDashboard = async () => {
  const session = await auth();

  const role = session?.user?.role;

  if (role !== "STUDENT") {
    return (
      <div>
        <p>you did not have acess to open this</p>
        
      </div>
    );
  }

  return (
    <div>
      Student Dashboard
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
}

export default StudentDashboard
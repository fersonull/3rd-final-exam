import Banner from "@/components/ui/banner";
import MembersTable from "@/components/members/members-table";

export default function Index() {
  return (
    <>
      <Banner
        title="Members"
        sub="All your team members are listed here. Add, remove, or update member details."
      />

      <MembersTable />
    </>
  );
}

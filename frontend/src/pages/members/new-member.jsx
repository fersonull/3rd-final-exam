import Banner from "@/components/ui/banner";
import NewMemberForm from "@/components/members/new-member-form";

export default function NewMember() {
  return (
    <>
      <Banner
        title="Add new member"
        sub="Fill out the form below to add a new team member."
      />

      <NewMemberForm />
    </>
  );
}

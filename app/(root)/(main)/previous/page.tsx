import CallCard from "@/components/callCard";


const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous meeting</h1>
      <CallCard type="ended" />
    </section>
  );
};

export default PreviousPage;

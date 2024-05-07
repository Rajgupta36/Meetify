import CallCard from "@/components/callCard";


const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming meeting</h1>
      <CallCard type="upcoming" />
    </section>
  );
};

export default UpcomingPage;
import CallCard from "@/components/callCard";


const RecordingPage = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <CallCard type="recordings" />
    </section>
  );
};

export default RecordingPage;

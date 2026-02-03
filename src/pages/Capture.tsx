import { CapturePage } from '@/components/quiz/CapturePage';

const Capture = () => {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // For testing purposes, just log the data
  };

  return (
    <div className="container max-w-[680px] min-h-screen flex flex-col px-6 py-10">
      <CapturePage onSubmit={handleSubmit} />
    </div>
  );
};

export default Capture;

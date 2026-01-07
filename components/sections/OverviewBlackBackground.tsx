export default function OverviewBlackBackground(props: {
  eyebrow_title?: string;
  title?: string;
  text?: string;
}) {
  const { eyebrow_title, title, text } = props;
  return (
    <div key={title} className="bg-[#151619] text-white pb-8 pt-20">
      <div className="max-w-[1440px] 2xl:max-w-[1640px] mx-auto px-4 py-10 flex flex-col md:flex-row gap-4">
        <div className="flex flex-col justify-center gap-4 md:w-1/2">
          <h3 className="text-[20px] md:text-[14px] lg:text-[18px] font-extralight uppercase mb-4">
            {eyebrow_title}
          </h3>
          <h2 
            className="max-w-[500px] text-[52px] md:text-[52px] font-extralight leading-14 mb-18"
            dangerouslySetInnerHTML={{ __html: title ?? "" }}
          />
        </div>
        <div 
          className="text-[18px] md:text-[18px] font-extralight md:w-1/2"
          dangerouslySetInnerHTML={{ __html: text ?? "" }}
        />
      </div>
    </div>
  );
}

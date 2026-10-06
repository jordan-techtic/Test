/**
 * Luna generated layout helpers
 * Content calendar card rows for dashboard sections
 * luna-spec-codegen: owned-layout
 */
import { figmaItemProps, figmaTextContent } from "./figmaDisplay";
import { Shared_076c906a } from "./Shared_076c906a";

type StaticCard = {
  frameNodeId: string;
  headerNodeId: string;
  dayNodeId: string;
  day: string;
  typeNodeId: string;
  typeLabel: string;
  imgNodeId: string;
  imgSrc: string;
  compNodeId: string;
  overlayTitle: string;
  overlayTag: string;
  titleNodeId: string;
  tagNodeId: string;
};

type BoundCard = {
  frameNodeId: string;
  headerNodeId: string;
  dayNodeId: string;
  dayFallback: string;
  typeNodeId: string;
  typeFallback: string;
  imgNodeId: string;
  imgSrc: string;
  compNodeId: string;
  overlayTitle: string;
  overlayTag: string;
  titleNodeId: string;
  tagNodeId: string;
  highlighted?: boolean;
};

function CalendarCardImage({
  imgNodeId,
  imgSrc,
}: Pick<StaticCard, "imgNodeId" | "imgSrc">) {
  return (
    <img
      data-figma-node={imgNodeId}
      src={imgSrc}
      alt="attLgjgQKNGEFOHWZ-large-IMG_6232 5"
      className="box-border w-[218px] h-[381px] absolute left-[16px] top-[50px] rounded-[10px] max-w-none object-cover object-top"
    />
  );
}

function StaticCalendarCard(card: StaticCard) {
  return (
    <div
      data-figma-node={card.frameNodeId}
      className="box-border h-[447px] rounded-[10px] relative overflow-hidden pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex flex-col gap-4 border-[rgba(200,164,126,0.05)] border-[1px] shrink-0"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div data-figma-node={card.headerNodeId} className="box-border w-[218px] h-[18px] relative flex items-center justify-between">
        <p data-figma-node={card.dayNodeId} className="box-border font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#828282]">
          {card.day}
        </p>
        <p data-figma-node={card.typeNodeId} className="box-border font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#c8a47e]">
          {card.typeLabel}
        </p>
      </div>
      <div className="box-border w-[218px] h-[381px] relative">
        <CalendarCardImage imgNodeId={card.imgNodeId} imgSrc={card.imgSrc} />
        <Shared_076c906a
          data-figma-node={card.compNodeId}
          title={card.overlayTitle}
          tagText={card.overlayTag}
          titleNodeId={card.titleNodeId}
          tagNodeId={card.tagNodeId}
          className="absolute left-[16px] top-[50px]"
        />
      </div>
    </div>
  );
}

function BoundCalendarCard(card: BoundCard) {
  const itemProps4543_3662 = figmaItemProps("4543:3662");
  const itemProps4543_3668 = figmaItemProps("4543:3668");
  const itemProps4543_3675 = figmaItemProps("4543:3675");
  const itemProps4543_3682 = figmaItemProps("4543:3682");
  const itemProps4543_3689 = figmaItemProps("4543:3689");
  const itemPropsByFrame: Record<string, ReturnType<typeof figmaItemProps>> = {
    "4543:3662": itemProps4543_3662,
    "4543:3668": itemProps4543_3668,
    "4543:3675": itemProps4543_3675,
    "4543:3682": itemProps4543_3682,
    "4543:3689": itemProps4543_3689,
  };
  const dayText =
    card.frameNodeId === "4543:3662"
      ? figmaTextContent("4543:3664", card.dayFallback)
      : card.frameNodeId === "4543:3668"
        ? figmaTextContent("4543:3670", card.dayFallback)
        : card.frameNodeId === "4543:3675"
          ? figmaTextContent("4543:3677", card.dayFallback)
          : card.frameNodeId === "4543:3682"
            ? figmaTextContent("4543:3684", card.dayFallback)
            : figmaTextContent("4543:3691", card.dayFallback);
  const typeText =
    card.frameNodeId === "4543:3662"
      ? figmaTextContent("4543:3665", card.typeFallback)
      : card.frameNodeId === "4543:3668"
        ? figmaTextContent("4543:3671", card.typeFallback)
        : card.frameNodeId === "4543:3675"
          ? figmaTextContent("4543:3678", card.typeFallback)
          : card.frameNodeId === "4543:3682"
            ? figmaTextContent("4543:3685", card.typeFallback)
            : figmaTextContent("4543:3692", card.typeFallback);
  const itemProps = itemPropsByFrame[card.frameNodeId] ?? {};
  return (
    <div
      data-figma-node={card.frameNodeId}
      {...itemProps}
      className={`box-border h-[447px] rounded-[10px] relative overflow-hidden pt-[16px] pr-[16px] pb-[16px] pl-[16px] flex flex-col gap-4 shrink-0 border-[1px] ${itemProps.hidden ? "hidden" : ""} ${card.highlighted ? "border-[rgba(200,164,126,0.6)]" : "border-[rgba(200,164,126,0.05)]"}`}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
    >
      <div data-figma-node={card.headerNodeId} className="box-border w-[218px] h-[18px] relative flex items-center justify-between">
        <p data-figma-node={card.dayNodeId} className="box-border font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-[#828282]">
          {dayText}
        </p>
        <p data-figma-node={card.typeNodeId} className="box-border font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#c8a47e]">
          {typeText}
        </p>
      </div>
      <div className="box-border w-[218px] h-[381px] relative">
        <CalendarCardImage imgNodeId={card.imgNodeId} imgSrc={card.imgSrc} />
        <Shared_076c906a
          data-figma-node={card.compNodeId}
          title={card.overlayTitle}
          tagText={card.overlayTag}
          titleNodeId={card.titleNodeId}
          tagNodeId={card.tagNodeId}
          className="absolute left-[16px] top-[50px]"
        />
      </div>
    </div>
  );
}

const NEW_CONTENT_CARDS: StaticCard[] = [
  {
    frameNodeId: "4543:4214",
    headerNodeId: "4543:4215",
    dayNodeId: "4543:4216",
    day: "Mon",
    typeNodeId: "4543:4217",
    typeLabel: "Reels",
    imgNodeId: "4543:4218",
    imgSrc: "/assets/figma/4543-4218.png",
    compNodeId: "4543:4219",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:4219;741:2399",
    tagNodeId: "I4543:4219;741:2402",
  },
  {
    frameNodeId: "4543:4278",
    headerNodeId: "4543:4279",
    dayNodeId: "4543:4280",
    day: "Tue",
    typeNodeId: "4543:4281",
    typeLabel: "Reels",
    imgNodeId: "4543:4283",
    imgSrc: "/assets/figma/4543-4283.png",
    compNodeId: "4543:4284",
    overlayTitle: "[City Name win], hallelujah | Justin Bieber Trend",
    overlayTag: "Instagram Reel",
    titleNodeId: "I4543:4284;741:2399",
    tagNodeId: "I4543:4284;741:2402",
  },
  {
    frameNodeId: "4543:4227",
    headerNodeId: "4543:4228",
    dayNodeId: "4543:4229",
    day: "Wed",
    typeNodeId: "4543:4230",
    typeLabel: "Story",
    imgNodeId: "4543:4232",
    imgSrc: "/assets/figma/4543-4232.png",
    compNodeId: "4543:4233",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Stories",
    titleNodeId: "I4543:4233;741:2399",
    tagNodeId: "I4543:4233;741:2402",
  },
  {
    frameNodeId: "4543:4234",
    headerNodeId: "4543:4235",
    dayNodeId: "4543:4236",
    day: "Thu",
    typeNodeId: "4543:4237",
    typeLabel: "Email",
    imgNodeId: "4543:4239",
    imgSrc: "/assets/figma/4543-4239.png",
    compNodeId: "4543:4240",
    overlayTitle: "Things I consider perfect | [City Name] edition",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:4240;741:2399",
    tagNodeId: "I4543:4240;741:2402",
  },
  {
    frameNodeId: "4543:4241",
    headerNodeId: "4543:4242",
    dayNodeId: "4543:4243",
    day: "Fri",
    typeNodeId: "4543:4244",
    typeLabel: "Story",
    imgNodeId: "4543:4246",
    imgSrc: "/assets/figma/4543-4246.png",
    compNodeId: "4543:4247",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:4247;741:2399",
    tagNodeId: "I4543:4247;741:2402",
  },
];

const YOUR_CALENDAR_CARDS: BoundCard[] = [
  {
    frameNodeId: "4543:3662",
    headerNodeId: "4543:3663",
    dayNodeId: "4543:3664",
    dayFallback: "Mon",
    typeNodeId: "4543:3665",
    typeFallback: "Reels",
    imgNodeId: "4543:3666",
    imgSrc: "/assets/figma/4543-3666.png",
    compNodeId: "4543:3667",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:3667;741:2399",
    tagNodeId: "I4543:3667;741:2402",
  },
  {
    frameNodeId: "4543:3668",
    headerNodeId: "4543:3669",
    dayNodeId: "4543:3670",
    dayFallback: "Tue",
    typeNodeId: "4543:3671",
    typeFallback: "Reels",
    imgNodeId: "4543:3673",
    imgSrc: "/assets/figma/4543-3673.png",
    compNodeId: "4543:3674",
    overlayTitle: "[City Name win], hallelujah | Justin Bieber Trend",
    overlayTag: "Instagram Reel",
    titleNodeId: "I4543:3674;741:2399",
    tagNodeId: "I4543:3674;741:2402",
    highlighted: true,
  },
  {
    frameNodeId: "4543:3675",
    headerNodeId: "4543:3676",
    dayNodeId: "4543:3677",
    dayFallback: "Wed",
    typeNodeId: "4543:3678",
    typeFallback: "Story",
    imgNodeId: "4543:3680",
    imgSrc: "/assets/figma/4543-3680.png",
    compNodeId: "4543:3681",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Stories",
    titleNodeId: "I4543:3681;741:2399",
    tagNodeId: "I4543:3681;741:2402",
  },
  {
    frameNodeId: "4543:3682",
    headerNodeId: "4543:3683",
    dayNodeId: "4543:3684",
    dayFallback: "Thu",
    typeNodeId: "4543:3685",
    typeFallback: "Email",
    imgNodeId: "4543:3687",
    imgSrc: "/assets/figma/4543-3687.png",
    compNodeId: "4543:3688",
    overlayTitle: "Things I consider perfect | [City Name] edition",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:3688;741:2399",
    tagNodeId: "I4543:3688;741:2402",
  },
  {
    frameNodeId: "4543:3689",
    headerNodeId: "4543:3690",
    dayNodeId: "4543:3691",
    dayFallback: "Fri",
    typeNodeId: "4543:3692",
    typeFallback: "Story",
    imgNodeId: "4543:3694",
    imgSrc: "/assets/figma/4543-3694.png",
    compNodeId: "4543:3695",
    overlayTitle: "Hates to see me coming",
    overlayTag: "Instagram Feed",
    titleNodeId: "I4543:3695;741:2399",
    tagNodeId: "I4543:3695;741:2402",
  },
];

export function NewContentThisWeekSection() {
  return (
    <div data-figma-node="4543:4207" className="box-border w-[1130px] h-[506px] absolute left-[0px] top-[602px] overflow-hidden flex flex-col gap-5">
      <div data-figma-node="4543:4208" className="box-border w-[1130px] h-[83px] relative flex items-center justify-between">
        <p data-figma-node="4543:4210" className="box-border font-eb-garamond text-[30px] font-[500] leading-[39px] text-left whitespace-nowrap text-[#ffffff]">
          New Content This Week
        </p>
        <p data-figma-node="4543:4212" className="box-border font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">
          Browse all
        </p>
      </div>
      <div data-figma-node="4543:4213" className="box-border w-[1130px] h-[447px] flex items-start gap-[10px] gap-2.5 overflow-x-auto">
        {NEW_CONTENT_CARDS.map((card) => (
          <StaticCalendarCard key={card.frameNodeId} {...card} />
        ))}
      </div>
    </div>
  );
}

export function YourContentCalendarSection() {
  return (
    <div data-figma-node="4543:3655" className="box-border w-[1130px] h-[530px] absolute left-[0px] top-[1590px] overflow-hidden flex flex-col gap-5">
      <div data-figma-node="4543:3656" className="box-border w-[1130px] h-[83px] relative flex items-center justify-between">
        <div data-figma-node="4543:3657" className="box-border flex flex-col items-start gap-1.5">
          <p data-figma-node="4543:3658" className="box-border font-eb-garamond text-[30px] font-[500] leading-[39px] text-left whitespace-nowrap text-[#ffffff]">
            Your content calendar
          </p>
          <p data-figma-node="4543:3659" className="box-border opacity-[0.6] font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">
            A gentle rhythm to keep your brand consistent.
          </p>
        </div>
        <p data-figma-node="4543:3660" className="box-border font-almarai text-[16px] font-[400] leading-[18px] text-left whitespace-nowrap text-[#ffffff]">
          Browse all
        </p>
      </div>
      <div data-figma-node="4543:3661" className="box-border w-[1130px] h-[447px] flex items-start gap-[10px] gap-2.5 overflow-x-auto">
        {YOUR_CALENDAR_CARDS.map((card) => (
          <BoundCalendarCard key={card.frameNodeId} {...card} />
        ))}
      </div>
    </div>
  );
}

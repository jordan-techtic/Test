/**
 * Luna generated shared component
 * Figma componentId: 741:2411
 * Component: Shared_076c906a
 * Ownership: Figma-owned layout
 * luna-spec-codegen: owned-layout
 */
type SharedProps = {
  className?: string;
  instanceNodeId?: string;
  overlayTitle?: string;
  chipLabel?: string;
  [key: string]: unknown;
};

function instancePrefix(instanceNodeId: string): string {
  return instanceNodeId.includes(":") ? `I${instanceNodeId.replace(":", ";")}` : instanceNodeId;
}

export function Shared_076c906a({
  className = "",
  instanceNodeId = "4543:4219",
  overlayTitle = "Hates to see me coming",
  chipLabel = "Instagram Feed",
  ...rest
}: SharedProps) {
  const prefix = instancePrefix(instanceNodeId);
  return (
    <div
      data-figma-node={instanceNodeId}
      data-figma-component="741:2411"
      className={`box-border w-[219px] h-[381px] overflow-hidden rounded-[6.07px] ${className}`}
      {...rest}
    >
      <div
        data-figma-node={`${prefix};741:2397`}
        className="box-border w-[218px] h-[381px] absolute left-[0px] top-[0px] rounded-[6.07px]"
      />
      <div
        data-figma-node={`${prefix};741:2398`}
        className="box-border w-[211px] h-[67px] absolute left-[-12px] top-[358px] rounded-[3.64px] flex flex-col items-start gap-[8px] gap-[8.5px] pt-[8px] pr-[7px] pb-[8px] pl-[7px] bg-[#ffffff]"
      >
        <p
          data-figma-node={`${prefix};741:2399`}
          className="box-border w-[197px] h-[16px] font-almarai text-[14px] font-[400] leading-[16px] text-left whitespace-nowrap text-on-light-surface"
          style={{ color: "#000000" }}
        >
          {overlayTitle}
        </p>
        <div data-figma-node={`${prefix};741:2400`} className="box-border w-[197px] h-[1px] bg-[#e0e0e0]" />
        <div
          data-figma-node={`${prefix};741:2401`}
          className="box-border w-[85px] h-[17px] rounded-full relative gap-[6.07px] pt-[6px] pr-[7px] pb-[6px] pl-[7px] border-[rgba(200,164,126,0.2)] border-[0.61px]"
          style={{ backgroundColor: "rgba(200, 164, 126, 0.1)" }}
        >
          <p
            data-figma-node={`${prefix};741:2402`}
            className="box-border w-[70px] h-[11px] absolute left-[7px] top-[3px] font-almarai text-[10px] font-[300] leading-[11px] text-left whitespace-nowrap text-[#000000]"
          >
            {chipLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

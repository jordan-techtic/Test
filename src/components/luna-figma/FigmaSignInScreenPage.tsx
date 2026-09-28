/** luna-spec-codegen: owned-layout */
import { FigmaFrameShell } from './FigmaFrameShell';
import { FigmaSection_n_998_1033 } from './FigmaSection_n_998_1033';

export function FigmaSignInScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame-sign-in">
          <FigmaSection_n_998_1033 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

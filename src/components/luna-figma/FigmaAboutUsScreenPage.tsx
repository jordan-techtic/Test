/** luna-spec-codegen: owned-layout */
import { FigmaFrameShell } from './FigmaFrameShell';
import { FigmaSection_n_3527_5463 } from './FigmaSection_n_3527_5463';
import { FigmaSection_n_3785_1859 } from './FigmaSection_n_3785_1859';
import { FigmaSection_n_4008_20203 } from './FigmaSection_n_4008_20203';
import { FigmaSection_n_632_836 } from './FigmaSection_n_632_836';
import { FigmaSection_n_856_1700 } from './FigmaSection_n_856_1700';
import { FigmaSection_n_863_4306 } from './FigmaSection_n_863_4306';

const ABOUT_FRAME_HEIGHT = 6158;

export function FigmaAboutUsScreenPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={ABOUT_FRAME_HEIGHT} nodeId="572:2518">
          <FigmaSection_n_3527_5463 />
          <FigmaSection_n_3785_1859 />
          <FigmaSection_n_4008_20203 />
          <FigmaSection_n_632_836 sectionId="content" />
          <FigmaSection_n_856_1700 />
          <FigmaSection_n_863_4306 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

export function AboutUsPage() {
  return <FigmaAboutUsScreenPage />;
}

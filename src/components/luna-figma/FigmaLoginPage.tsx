/** luna-spec-codegen: owned-layout */
import './figma-fonts.css';
import { FigmaFrameShell } from './FigmaFrameShell';
import { FigmaSection_n_1006_1334 } from './FigmaSection_n_1006_1334';
import { FigmaSection_n_1006_1336 } from './FigmaSection_n_1006_1336';
import { FigmaSection_n_1006_1338 } from './FigmaSection_n_1006_1338';
import { FigmaSection_n_2779_25547 } from './FigmaSection_n_2779_25547';
import { SignInForm } from '@/features/auth/SignInForm';

export function FigmaLoginPage() {
  return (
    <div className="relative flex w-full flex-col" style={{ backgroundColor: '#0b0b0b' }}>
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="998:1024">
          <FigmaSection_n_1006_1334 />
          <FigmaSection_n_1006_1338 />
          <FigmaSection_n_2779_25547 />
          <SignInForm />
          <FigmaSection_n_1006_1336 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}

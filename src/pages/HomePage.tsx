import { useEffect } from 'react';

import { FigmaScreenPage } from '@/components/luna-figma/FigmaScreenPage';
import { useVisitorHome } from '@/hooks/useVisitorHome';

const DEFAULT_PRIVACY_LINK = '/privacy-policy';
const DEFAULT_TERMS_LINK = '/terms-of-service';
const DEFAULT_CONTACT_EMAIL = 'hello@agentwisemarketing.com';

export default function HomePage() {
  const { status, data, error } = useVisitorHome();

  useEffect(() => {
    document.title = 'Agentwise';
  }, []);

  return (
    <div className="flex w-full flex-col">
      <FigmaScreenPage
        privacyPolicyLink={data?.privacy_policy_link || DEFAULT_PRIVACY_LINK}
        termsOfServiceLink={data?.terms_of_service_link || DEFAULT_TERMS_LINK}
        contactEmail={data?.contact_email || DEFAULT_CONTACT_EMAIL}
        phone={data?.phone || ''}
        visitorHomeError={status === 'error' ? error ?? 'Contact links unavailable.' : null}
        visitorHomeLoading={status === 'loading'}
      />
    </div>
  );
}

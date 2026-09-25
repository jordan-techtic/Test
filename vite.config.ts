import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

/** luna-spec-text 1007:1922: I have read and agree to the Terms of Use and Privacy Policy. */
export const LUNA_SPEC_TEXT_1007_1922 =
  'I have read and agree to the Terms of Use and Privacy Policy.';

/** luna-spec-text 1007:1926: Already have an account? Sign in */
export const LUNA_SPEC_TEXT_1007_1926 = 'Already have an account? Sign in';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://174.138.72.184:4040',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

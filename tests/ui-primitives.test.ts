import { describe, expect, it } from 'vitest';
import { Calendar, CalendarDayButton } from '@/components/ui/calendar';
import { Calendar as DatePickerCalendar, DatePicker } from '@/components/ui/date-picker';
import { toast, Toaster } from '@/components/ui/sonner';

describe('ui primitives', () => {
  it('exports a complete sonner toast API', () => {
    expect(typeof toast).toBe('function');
    expect(typeof toast.success).toBe('function');
    expect(typeof toast.error).toBe('function');
    expect(typeof toast.info).toBe('function');
    expect(typeof toast.warning).toBe('function');
    expect(typeof toast.message).toBe('function');
    expect(typeof toast.promise).toBe('function');
    expect(typeof toast.loading).toBe('function');
    expect(typeof toast.custom).toBe('function');
    expect(typeof toast.dismiss).toBe('function');
    expect(typeof Toaster).toBe('function');
  });

  it('exports calendar compound components', () => {
    expect(typeof Calendar).toBe('function');
    expect(typeof CalendarDayButton).toBe('function');
  });

  it('re-exports calendar from the date-picker primitive', () => {
    expect(typeof DatePicker).toBe('function');
    expect(typeof DatePickerCalendar).toBe('function');
    expect(DatePickerCalendar).toBe(Calendar);
  });
});

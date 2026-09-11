-- ─── Run this ONCE in Supabase → SQL Editor ───────────────────────────────────
-- Adds the slot column to the existing payments table for 50/50 payment splitting.
--
-- slot = 1 → visible on admin dashboard (partner A)
-- slot = 2 → hidden from admin dashboard, but clients still get full access (partner B)
--
-- All existing payments default to slot 1 so nothing breaks on the admin side.

alter table payments
  add column if not exists slot integer not null default 1
    check (slot in (1, 2));

create index if not exists idx_payments_slot on payments(slot);

import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature');

  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    const { data: tx } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('reference', reference)
      .eq('status', 'pending')
      .single();

    if (tx) {
      await supabaseAdmin
        .from('transactions')
        .update({ status: 'success' })
        .eq('id', tx.id);
      await supabaseAdmin.rpc('increment_coins', {
        user_id_input: tx.user_id,
        amount_input: tx.coins_purchased,
      });
    }
  }
  return NextResponse.json({ received: true });
}

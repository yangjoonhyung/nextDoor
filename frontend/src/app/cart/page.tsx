'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CartClient from './CartClient';
import { Suspense } from 'react';

export default function CartPage() {
  // Wrap client component in Suspense to avoid prerender errors
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <CartClient />
    </Suspense>
  );
}

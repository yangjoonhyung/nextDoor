'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CartClient from './CartClient';

export default function CartPage() {
  return <CartClient />;
}

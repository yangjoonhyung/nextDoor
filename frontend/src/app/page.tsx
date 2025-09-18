'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleStartTravel = () => {
    router.push('/travel');
  };
  return (
    <section className="flex flex-col lg:flex-row items-center gap-16 py-20">
      {/* 왼쪽 영역 - 텍스트 + 버튼 */}
      <div className="flex-1 space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            붐비는 곳은 피하고, <br />
            맛있는 시간엔 맛집으로
          </h1>
          <p className="text-xl text-gray-500">
            당신의 시간을 가장 효율적으로 써주는 여행 동선 추천 <br />
            혼잡도, 거리, 식사 시간까지 고려한 최적의 여행 루트를 만나보세요.
          </p>
        </div>

        <div className="mt-10">
          <button
            onClick={handleStartTravel}
            className="bg-[#56A3FF] hover:bg-blue-400 text-white px-8 py-4 rounded-lg transition-colors font-medium text-lg"
          >
            Next Door 시작하기
          </button>
        </div>
      </div>

      {/* 오른쪽 영역 - 이미지 */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/main-illustration.png"
          alt="여행 경로 일러스트"
          width={500}
          height={400}
          className="w-full max-w-[500px] h-auto"
        />
      </div>
    </section>
  );
}

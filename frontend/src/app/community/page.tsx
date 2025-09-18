'use client';

import { useState, useEffect } from 'react';

// 게시글 타입 정의
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([]);

  // 백엔드 API 연동을 위한 useEffect (나중에 구현)
  useEffect(() => {
    // 더미 데이터
    const dummyPosts: Post[] = [
      {
        id: 1,
        title: '서울 여행 추천 코스',
        content:
          '서울에서 꼭 가봐야 할 명소들을 소개합니다. 경복궁, 남산타워, 명동, 홍대 등 다양한 관광지와 맛집들을 추천드립니다. 특히 봄철 벚꽃 시즌에는 여의도 한강공원이 정말 아름답습니다.',
        author: '김여행',
        date: '2024.01.15',
      },
      {
        id: 2,
        title: '제주도 맛집 리스트',
        content:
          '제주도에서 꼭 먹어봐야 할 음식점들을 정리했습니다. 흑돼지, 갈치조림, 한라봉 등 제주도 특색 있는 음식들과 함께 맛있는 식당들을 소개합니다. 특히 서귀포 지역의 해산물 맛집은 정말 추천합니다.',
        author: '이맛집',
        date: '2024.01.14',
      },
      {
        id: 3,
        title: '부산 해운대 여행 후기',
        content:
          '해운대 해수욕장과 감천문화마을 다녀온 후기입니다. 해운대의 아름다운 바다와 감천문화마을의 컬러풀한 집들이 정말 인상적이었습니다. 부산의 맛집들도 정말 다양하고 맛있었어요.',
        author: '박바다',
        date: '2024.01.13',
      },
    ];

    // fetch('/api/posts')
    //   .then(res => res.json())
    //   .then(data => {
    //     setPosts(data);
    //   });
    setPosts(dummyPosts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 상단 제목 */}
        <h1 className="text-2xl font-bold mb-6 px-4">게시판</h1>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 mb-4"
            >
              {/* 제목 */}
              <h3 className="text-lg font-semibold">{post.title}</h3>

              {/* 내용 요약 */}
              <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>

              {/* 하단 정보 */}
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

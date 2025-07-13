import type { Metadata } from "next";

import cn from "classnames";
import { inter } from "../fonts";
import { FaqType } from "../interface";

export const metadata: Metadata = {
  title: "nextbnb 도움말",
  description: "nextbnb에 궁금한 점을 확인하세요",
  keywords: ["nextbnb", "도움말", "정보", "여행 팁", "숙소 팁"],
};

export default async function FaqPage() {
  const data: FaqType[] = await getData();

  return (
    <div className={cn("max-w-5xl mx-auto", inter.className)}>
      <h1 className="text-lg md:text-3xl font-semibold">FAQ</h1>
      <p className="mt-2 text-gray-600">도움말 내용을 확인해주세요.</p>
      <div className="mt-8 flex flex-col mb-10">
        {data?.map((faq) => (
          <div key={faq.id} className="py-5 border-b border-b-gray-200 text-black items-center font-semibold">
            <div>{faq.title}</div>
            <div className="text-gray-600 font-normal mt-2">{faq.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/faqs`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("failed to fetch");
    }

    return res.json();
  } catch (e) {
    console.error(e);
  }
}

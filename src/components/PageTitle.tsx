import React from "react";

export type PageTitleParams = { title: string };

export const PageTitle = ({ title }: PageTitleParams) => (
  <div className="flex">
    <h1 className="pt-5 pl-2 md:pl-10 font-bold text-4xl text-gainsboro">
      {title}
    </h1>
  </div>
);

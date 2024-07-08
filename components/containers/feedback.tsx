"use client";

import { ProductContext } from "@/user-provider";
import { useContext } from "react";
import { Header } from "../header";
import Empty from "../empty";
import { ProductRequest } from "@/libs/definitions";
import ProductCard from "./product-card";

export default function FeedbackContainer({
  data,
}: {
  data: ProductRequest[];
}) {
  const { sort, sortBy }: any = useContext(ProductContext);
  let items: ProductRequest[];
  sort == "ALL"
    ? (items = data)
    : (items = data?.filter(
        (item: ProductRequest) =>
          item.category.toLowerCase() == sort.toLowerCase()
      ));
  function sort_data() {
    return items.sort((a: ProductRequest, b: ProductRequest) => {
      switch (sortBy) {
        case "Most Comments":
          return b.comments.length - a.comments.length;
        case "Least Comments":
          return a.comments.length - b.comments.length;
        case "Least Upvotes":
          return a.upvotes - b.upvotes;
        default:
          return b.upvotes - a.upvotes;
      }
    });
  }

  return (
    <section>
      <Header count={items.length} />
      {items.length > 0 ? (
        sort_data()?.map((item) => (
          <div key={item._id}>
            <ProductCard item={item} />
          </div>
        ))
      ) : (
        <Empty />
      )}
    </section>
  );
}

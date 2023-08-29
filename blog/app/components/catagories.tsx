import { Category, Post, SanityKeyedReference } from "@/sanity/types";
import { Chip } from "@nextui-org/chip";

export function CategoryChips(props: {
  categories: Array<Category>;
  variant?: "dot" | "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
}) {
  return (
    <div>
      {props.categories.map((category) => (
        <span className="pr-2">
          <Chip id={category._id} variant={props.variant} color="secondary">
            {category.title}
          </Chip>
        </span>
      ))}
    </div>
  );
}

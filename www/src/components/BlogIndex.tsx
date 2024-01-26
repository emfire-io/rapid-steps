import { getPagesUnderRoute } from "nextra/context";
import Link from "next/link";

const BlogIndex = () =>  {
  return getPagesUnderRoute("/blog").map((page) => {
    return (
      <div key={page.route} className="mb-8">
        <h3>
          <Link
            href={page.route}
            style={{ color: "inherit", textDecoration: "none" }}
            className="block font-semibold mt-8 text-2xl "
          >
            {page.meta?.title || page.name}
          </Link>
        </h3>
        <p className="opacity-80 mt-3 leading-7">
          {page.meta?.description}{" "}
          <span className="inline-block">
            <Link
              href={page.route}
              className="text-fuchsia-800 underline underline-offset-2 decoration-from-font"
            >
              Read more →
            </Link>
          </span>
        </p>
        {page.meta?.date && (
          <p className="text-sm text-gray-400 mt-3">
            {page.meta.date}
          </p>
        )}
      </div>
    );
  });
}

export default BlogIndex;

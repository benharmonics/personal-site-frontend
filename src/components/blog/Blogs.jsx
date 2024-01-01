import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { PageTitle } from '../PageTitle';
import { LoadingSpinner } from '../../assets/svg';
import { handleRes } from '../../utils/requests';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [longLoad, setLongLoad] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const opts = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:9090/blogs', opts)
      .then(res => {
        handleRes(res);
        return res;
      })
      .then(async res => {
        setBlogs(await res.json());
      })
      .catch(() => {
        toast.error(`Failed to get blogs`);
        setApiError(true);
      });
  }, []);

  setTimeout(() => blogs || setLongLoad(true), 300);

  return (
    <>
      <PageTitle title="Blogs" />
      {!blogs && !apiError && longLoad && <LoadingSpinner />}
      {blogs && <BlogEntries blogs={blogs} />}
    </>
  );
};

/**
 *
 * @param {Array<*>} blogs
 * @returns
 */
const BlogEntries = ({ blogs }) => {
  return (
    <div className="grid p-5 justify-center">
      {blogs.map((blog, idx) => (
        <div className="pb-4" key={idx}>
          <div className="w-fit lg:w-[800px] h-fit p-2 bg-gainsboro rounded">
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                Title:
              </span>
              {blog.title}
            </p>
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                Subtitle:
              </span>
              {blog.subtitle || <span className="opacity-50">N/A</span>}
            </p>
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                Author:
              </span>
              {blog.author}
            </p>
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                Created At:
              </span>
              {new Date(blog.dateCreated).toLocaleString()}
            </p>
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                Last Updated:
              </span>
              {new Date(blog.lastUpdate).toLocaleString()}
            </p>
            <p className="w-full flex">
              <span className="font-semibold text-midnight w-32 text-left">
                ID:
              </span>
              {blog.id}
            </p>
            <p className="w-full text-left">{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;

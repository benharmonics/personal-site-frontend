import { useReducer } from 'react';
import toast from 'react-hot-toast';
import { formReducer } from '../../utils/hooks';
import { handleRes } from '../../utils/requests';

export const NewBlogPost = () => {
  const [formData, setFormData] = useReducer(formReducer, {});

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    toast.promise(
      fetch('http://localhost:9090/blogs/new', opts).then(handleRes),
      {
        loading: 'Saving...',
        success: <b>Post saved</b>,
        error: <b>Could not save</b>,
      }
    );
  };

  return (
    <div className="pt-5 grid justify-center">
      <div className="py-5 px-16 bg-gainsboro rounded">
        <h2 className="text-midnight text-xl font-semibold">
          Create a new blog post
        </h2>
        <form onSubmit={handleSubmit} className="pt-2">
          <fieldset>
            <div className="md:flex">
              <div className="pr-4">
                <label>
                  <span className="pr-2">Author</span>
                  <input
                    name="author"
                    type="text"
                    onChange={handleChange}
                    className="p-0.5 rounded"
                  />
                </label>
              </div>
              <div className="md:pt-0 sm:pt-2">
                <label>
                  <span className="pr-2">Title</span>
                  <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                    className="p-0.5 rounded"
                  />
                </label>
              </div>
            </div>
            <label>
              <p className="text-left">Content</p>
              <textarea
                name="content"
                type="text"
                onChange={handleChange}
                className="w-full h-80 p-0.5 rounded"
              />
            </label>
          </fieldset>
          <div className="pt-5">
            <button
              type="submit"
              className="p-2 text-gainsboro text-lg font-semibold bg-bittersweet rounded hover:brightness-110"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { NewBlogPost } from './blog/NewBlogPost';
import { PageTitle } from './PageTitle';

export default function AdminPanel() {
  const [selected, setSelected] = useState('default');

  return (
    <div>
      <PageTitle title="Admin Panel" />
      <div className="absolute right-10 top-5">
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="py-1 pl-1 pr-8 bg-gainsboro rounded hover:brightness-110 hover:cursor-pointer"
        >
          <option value="default">Dashboard</option>
          <option value="blog">New Blog Post</option>
          <option value="other">Other</option>
        </select>
      </div>
      {selected === 'default' ? (
        <div className="flex justify-center pt-5">
          <p className="p-2 bg-gainsboro text-midnight rounded">
            This should be a handy admin panel!
          </p>
        </div>
      ) : selected === 'blog' ? (
        <NewBlogPost />
      ) : (
        <div>Under construction</div>
      )}
    </div>
  );
}

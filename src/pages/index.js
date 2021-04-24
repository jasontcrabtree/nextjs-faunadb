import { useEffect, useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [shows, setShows] = useState([]);
  const [newShow, setNewShow] = useState('');

  // On page load all shows and set to setShows
  useEffect(() => {
    async function fetchShows() {
      const showData = await fetcher('/api/getShows');
      setShows(showData.data);
    }
    fetchShows();
  }, []);

  // Handle new show form value
  function handleNewShow(e) {
    setNewShow(e.target.value);
  }

  // API function call to add new show (via nextjs api routes)
  async function handleAddShow() {
    const res = await fetch('/api/addShows', {
      method: 'POST',
      body: JSON.stringify({
        title: newShow,
      }),
    });
    const body = await res.json();
    // add the new show to the existing list
    const newShows = shows.slice();
    newShows.push(body.data);
    setShows(newShows);
    setNewShow('');
  }

  // Update shows
  async function handleUpdateShow(e) {
    const res = await fetch('/api/updateShow', {
      method: 'POST',
      body: JSON.stringify({
        title: e.target.value,
        watched: e.target.checked,
      }),
    });

    let newShows = shows.slice();
    newShows = newShows.map((show) => {
      if (show.data.title === e.target.value) {
        return {
          ...show,
          data: { title: e.target.value, watched: e.target.checked },
        };
      }
      return show;
    });
    setShows(newShows);
  }

  console.log(shows);

  // Render everything
  return (
    <main>
      <section>
        <h1>Next JS / Fauna Playground</h1>
      </section>

      <section>
        <ul>
          {shows.map((show, i) => (
            <li key={i}>
              {show.data.title} {show.data.watched ? '✓' : 'X'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <form>
          <fieldset>
            <legend>Shows I want to watch</legend>
            <input
              name="newShow"
              type="text"
              value={newShow}
              onChange={handleNewShow}
            />
            <input type="button" value="Add" onClick={handleAddShow} />
          </fieldset>
        </form>
      </section>

      <section>
        <form>
          <fieldset>
            <legend>Update Watch Status</legend>

            {shows.map((show, index) => (
              <label htmlFor="showWatched" key={index}>
                <input
                  type="checkbox"
                  name="showWatched"
                  value={show.data.title}
                  onClick={handleUpdateShow}
                  defaultChecked={show.data.watched}
                />
                <span>{show.data.title}</span>
              </label>
            ))}
          </fieldset>
        </form>
      </section>
    </main>
  );
}

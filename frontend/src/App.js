import PageSite from "./components/PageSite";

function App() {
  return (
    <PageSite title="Home">
      <div className="w-full p-8 text-center">
        <h1>Welcome to Task App</h1>

        <p className="mt-4">
          <a href="/login">Login Here &rarr;</a>
        </p>
      </div>
    </PageSite>
  );
}

export default App;

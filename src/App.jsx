import Skeleton from "./components/Skeleton";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world! </h1>
      <button className="btn btn-secondary">Secondary</button>
      <Skeleton className="w-24 h-8" />
    </div>
  );
}
export default App;

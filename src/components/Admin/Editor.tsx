import { LuX } from "react-icons/lu";

const Editor = ({ type }: { type: string }) => {
  const getEditorType = () => {
    switch (type) {
      case "type":
        return (
          <div className="flex flex-col w-[250px] h-[100px] gap-2">
            <label className="ml-1" htmlFor="type">Select section type</label>
            <select className="border border-gray-300 rounded p-1" name="section" id="type">
              <option value="regular">Regular</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        );
      case "price":
        return <h2>Price Editor</h2>;
      case "availability":
        return <h2>Availability Editor</h2>;
      default:
        return <h2>Editor</h2>;
    }
  };

  return (
    <div className="fixed w-screen h-screen bg-black/20 z-10 overflow-visible flex justify-center items-center">
      <div className=" bg-white p-4 flex flex-col text-[15px] text-primary/70">
        <button className="flex w-full justify-end mb-6">
          <LuX size={18} />
        </button>
        {getEditorType()}
      </div>
    </div>
  );
};

export default Editor;

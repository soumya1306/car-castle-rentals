const Editor = ({ type }: { type: string }) => {
  const getEditorType = () => {
    switch (type) {
      case "type":
        return <h2>Car Editor</h2>;
      case "price":
        return <h2>Price Editor</h2>;
      case "availability":
        return <h2>Availability Editor</h2>;
      default:
        return <h2>Editor</h2>;
    }
  };

  return (
    <div className="fixed flex bg-black/30 w-screen h-screen justify-center items-center z-10">
      <div className=" bg-white">{getEditorType()}</div>
    </div>
  );
};

export default Editor;

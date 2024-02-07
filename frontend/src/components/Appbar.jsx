export const Appbar = ({ name }) => {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center text-xl font-semibold h-full ml-4">
        PayTM App
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-6">Hello</div>
        <div className="h-12 w-12 flex justify-center mt-1 mr-2">
          <div className="flex flex-col mr-5 justify-center h-full text-xl">
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

import Rive from "@rive-app/react-canvas";

export const DialpadRiveIcon = () => {
  return (
    <div className="w-screen h-screen">
      <div></div>
      <div className="h-96" style={{ height: "100vh" }}>
        <Rive src="loaderv3.riv" stateMachines="Main" />
      </div>
    </div>
  );
};

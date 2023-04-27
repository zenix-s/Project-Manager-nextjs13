"use client";
import Button from "../button";
import { FiArchive } from "react-icons/fi";
const ButtonMockups = () => {
  return (
    <section className="flex h-full flex-col gap-4 bg-slate-400 p-4">
      <div>
        <h1>Buttons</h1>
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme light"
          onClick={() => console.log("clicked")}
          theme="light"
          textColor="black"
        />
        <Button
          label="Button theme dark"
          onClick={() => console.log("clicked")}
          theme="dark"
          textColor="white"
        />
        <Button
          label="Button theme transparent"
          onClick={() => console.log("clicked")}
          theme="transparent"
          textColor="black"
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme light with icon"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
        />
        <Button
          label="Button theme dark with icon"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
        />
        <Button
          label="Button theme transparent with icon"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="black"
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme transparent hover whiter"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="black"
          hoverEffect="whiter"
        />
        <Button
          label="Button theme transparent hover darker"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="white"
          hoverEffect="darker"
        />
        <Button
          label="Button theme transparent hover none"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="black"
          hoverEffect="none"
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme light hover whiter"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
          hoverEffect="whiter"
        />
        <Button
          label="Button theme light hover darker"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
          hoverEffect="darker"
        />
        <Button
          label="Button theme light hover none"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
          hoverEffect="none"
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme dark hover whiter"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
          hoverEffect="whiter"
        />
        <Button
          label="Button theme dark hover darker"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
          hoverEffect="darker"
        />
        <Button
          label="Button theme dark hover none"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
          hoverEffect="none"
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme light with icon and no padding"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
          padding={false}
        />
        <Button
          label="Button theme dark with icon and no padding"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
          padding={false}
        />
        <Button
          label="Button theme transparent with icon and no padding"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="black"
          padding={false}
        />
      </div>
      <div className="flex gap-4">
        <Button
          label="Button theme light with shadow"
          onClick={() => console.log("clicked")}
          theme="light"
          icon={FiArchive}
          textColor="black"
          shadow={true}
        />
        <Button
          label="Button theme dark with shadow"
          onClick={() => console.log("clicked")}
          theme="dark"
          icon={FiArchive}
          textColor="white"
          shadow={true}
        />
        <Button
          label="Button theme transparent with shadow"
          onClick={() => console.log("clicked")}
          theme="transparent"
          icon={FiArchive}
          textColor="black"
          shadow={true}
        />
      </div>
    </section>
  );
};

export default ButtonMockups;
